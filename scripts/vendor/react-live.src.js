/*
 * React runtime for live code scenes in React lessons.
 * Exposes window.React, window.ReactDOM (react-dom/client) and window.__jsx(code),
 * a small JSX → React.createElement transform built on esprima (ES2017 + JSX).
 * Rebuild: node scripts/vendor/build-react-live.mjs  → public/vendor/react-live.js
 *
 * React and esprima are MIT / BSD-2-Clause licensed; see their packages for notices.
 */
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { parseScript } from 'esprima';

const isJsx = (n) => n && (n.type === 'JSXElement' || n.type === 'JSXFragment');

/** Outermost JSX nodes inside an AST subtree (does not descend into JSX) */
function outer(node, out = []) {
  if (!node || typeof node.type !== 'string') return out;
  if (isJsx(node)) {
    out.push(node);
    return out;
  }
  for (const key of Object.keys(node)) {
    if (key === 'range' || key === 'loc') continue;
    const v = node[key];
    if (Array.isArray(v)) v.forEach((c) => c && typeof c.type === 'string' && outer(c, out));
    else if (v && typeof v.type === 'string') outer(v, out);
  }
  return out;
}

/** Source of [start, end) with every JSX node inside `node` rewritten */
function rewrite(src, node, start, end) {
  const parts = [];
  let pos = start;
  for (const j of outer(node).sort((a, b) => a.range[0] - b.range[0])) {
    parts.push(src.slice(pos, j.range[0]), gen(src, j));
    pos = j.range[1];
  }
  parts.push(src.slice(pos, end));
  return parts.join('');
}

const expr = (src, n) => rewrite(src, n, n.range[0], n.range[1]);

function tagName(n) {
  if (n.type === 'JSXIdentifier') return /^[a-z]/.test(n.name) || n.name.includes('-') ? JSON.stringify(n.name) : n.name;
  if (n.type === 'JSXMemberExpression') return `${tagName(n.object)}.${n.property.name}`;
  if (n.type === 'JSXNamespacedName') return JSON.stringify(`${n.namespace.name}:${n.name.name}`);
  return 'null';
}

/** React's JSX whitespace rules for text children */
function text(raw) {
  const lines = raw.split(/\r\n|\n|\r/);
  let out = '';
  lines.forEach((line, i) => {
    let t = line.replace(/\t/g, ' ');
    if (i > 0) t = t.replace(/^\s+/, '');
    if (i < lines.length - 1) t = t.replace(/\s+$/, '');
    if (t) out += (out && i > 0 ? ' ' : '') + t;
  });
  return out ? JSON.stringify(out) : null;
}

function gen(src, n) {
  const children = [];
  for (const c of n.children) {
    if (c.type === 'JSXText') {
      const t = text(c.value);
      if (t) children.push(t);
    } else if (c.type === 'JSXExpressionContainer') {
      if (c.expression.type !== 'JSXEmptyExpression') children.push(expr(src, c.expression));
    } else if (isJsx(c)) children.push(gen(src, c));
  }
  if (n.type === 'JSXFragment') return `React.createElement(React.Fragment, null${children.map((c) => ', ' + c).join('')})`;
  const open = n.openingElement;
  const props = open.attributes.map((a) => {
    if (a.type === 'JSXSpreadAttribute') return `...${expr(src, a.argument)}`;
    const key = a.name.type === 'JSXNamespacedName' ? `${a.name.namespace.name}:${a.name.name.name}` : a.name.name;
    let val = 'true';
    if (a.value) {
      if (a.value.type === 'Literal') val = JSON.stringify(a.value.value);
      else if (a.value.type === 'JSXExpressionContainer') val = expr(src, a.value.expression);
      else if (isJsx(a.value)) val = gen(src, a.value);
    }
    return `${JSON.stringify(key)}: ${val}`;
  });
  const p = props.length ? `{ ${props.join(', ')} }` : 'null';
  return `React.createElement(${tagName(open.name)}, ${p}${children.map((c) => ', ' + c).join('')})`;
}

function transform(code) {
  // esprima 4 predates <></> fragments: spell them out first (same length is not needed)
  code = code.replace(/<>/g, '<React.Fragment>').replace(/<\/>/g, '</React.Fragment>');
  const ast = parseScript(code, { jsx: true, range: true, tolerant: false });
  return rewrite(code, ast, 0, code.length);
}

window.React = React;
window.ReactDOM = ReactDOMClient;
window.__jsx = transform;
