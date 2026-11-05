/**
 * Emoji → Twemoji SVG inside the sandboxed preview iframes (browser scenes, live code).
 * The React app itself uses ./jsx-runtime; these helpers build the iframe documents.
 */
import { AVAILABLE } from './available';
import { EMOJI_SOURCE, emojiKey, emojiRe } from './pattern';

const STYLE = 'width:1.1em;height:1.1em;vertical-align:-0.18em;display:inline-block;margin:0 .04em;pointer-events:none';
const origin = () => (typeof window === 'undefined' ? '' : window.location.origin);

/** Replaces emoji in plain text with <img> tags (HTML string) */
function emojiText(text: string) {
  return text.replace(emojiRe(), (m) => {
    const k = emojiKey(m);
    return AVAILABLE.has(k) ? `<img class="emoji" src="${origin()}/emoji/${k}.svg" alt="${m}" draggable="false" style="${STYLE}">` : m;
  });
}

/** Emoji in the text parts of an HTML string; tags, attributes, <script>, <style>, <textarea> untouched */
export function emojiHtml(html: string) {
  return html
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<textarea[\s\S]*?<\/textarea>|<title[\s\S]*?<\/title>|<[^>]*>)/i)
    .map((part, i) => (i % 2 ? part : emojiText(part)))
    .join('');
}

/** Shared bits for scripts that run inside the iframe */
function iframeBase() {
  return `var __eRe=new RegExp(${JSON.stringify(EMOJI_SOURCE)},'gu'),__eOk=new Set(${JSON.stringify([...AVAILABLE])}),__eSrc=${JSON.stringify(origin() + '/emoji/')};
function __eKey(s){return Array.from(s).map(function(c){return c.codePointAt(0)}).filter(function(c){return c!==0xfe0f}).map(function(c){return c.toString(16)}).join('-')}
function __eSplit(t){var out=[],last=0,m,any=false;__eRe.lastIndex=0;while((m=__eRe.exec(t))){var k=__eKey(m[0]);if(!__eOk.has(k))continue;any=true;if(m.index>last)out.push(t.slice(last,m.index));out.push({k:k,a:m[0]});last=m.index+m[0].length}if(!any)return null;if(last<t.length)out.push(t.slice(last));return out}`;
}

/** For vanilla-JS previews: replaces emoji in text nodes now and whenever the page changes */
export function emojiObserverScript() {
  return `<script>(function(){${iframeBase()}
var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,TITLE:1,OPTION:1};
function img(p){var i=document.createElement('img');i.className='emoji';i.src=__eSrc+p.k+'.svg';i.alt=p.a;i.draggable=false;i.setAttribute('style',${JSON.stringify(STYLE)});return i}
function fix(n){if(n.nodeType===3){if(!n.parentNode||SKIP[n.parentNode.nodeName])return;var parts=__eSplit(n.nodeValue);if(!parts)return;var f=document.createDocumentFragment();parts.forEach(function(p){f.appendChild(typeof p==='string'?document.createTextNode(p):img(p))});n.parentNode.replaceChild(f,n)}else if(n.nodeType===1&&!SKIP[n.nodeName]){Array.prototype.slice.call(n.childNodes).forEach(fix)}}
function start(){fix(document.body);new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='characterData')fix(m.target);else m.addedNodes.forEach(fix)})}).observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();</script>`;
}

/** For React previews: window.__ce wraps React.createElement and turns emoji text children into images */
export function emojiReactScript() {
  return `<script>${iframeBase()}
window.__ce=function(t,p){var c=Array.prototype.slice.call(arguments,2),out=[],n=0;
c.forEach(function(x){var parts=typeof x==='string'&&t!=='textarea'&&t!=='option'?__eSplit(x):null;if(!parts){out.push(x);return}
parts.forEach(function(q){out.push(typeof q==='string'?q:React.createElement('img',{key:'e'+(n++),className:'emoji',src:__eSrc+q.k+'.svg',alt:q.a,draggable:false,style:{width:'1.1em',height:'1.1em',verticalAlign:'-0.18em',display:'inline-block',margin:'0 .04em'}}))})});
return React.createElement.apply(React,[t,p].concat(out))};</script>`;
}
