import type { ReactNode } from 'react';

export type CodeLang = 'js' | 'css' | 'html' | 'text';

const RULES: Record<Exclude<CodeLang, 'text'>, [string, RegExp][]> = {
  js: [
    ['com', /\/\/.*|\/\*.*?\*\//y],
    ['str', /`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/y],
    ['num', /\b\d+(?:\.\d+)?\b/y],
    ['kw', /\b(?:let|const|var|for|while|do|if|else|switch|case|default|break|continue|return|function|of|in|new|class|true|false|null|undefined|typeof|import|export|from)\b/y],
    ['fn', /\b[A-Za-z_$][\w$]*(?=\s*\()/y],
    ['id', /\b[A-Za-z_$][\w$]*\b/y],
    ['op', /[+\-*/%=<>!&|?:]+/y],
  ],
  css: [
    ['com', /\/\*.*?\*\//y],
    ['at', /@[\w-]+/y],
    ['str', /'[^']*'|"[^"]*"/y],
    ['prop', /[\w-]+(?=\s*:(?!:))/y],
    ['num', /-?\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|deg|fr)?/y],
    ['sel', /[.#]?[\w-]+(?=[^{};]*\{)|::?[\w-]+/y],
    ['kw', /#[0-9a-fA-F]{3,8}\b|!important/y],
  ],
  html: [
    ['com', /<!--.*?-->/y],
    ['tag', /<\/?[\w-]+|\/?>/y],
    ['attr', /\b[\w-]+(?==)/y],
    ['str', /"[^"]*"|'[^']*'/y],
  ],
};

/** Tiny regex highlighter (one line at a time) — enough for teaching snippets. */
export function highlightLine(line: string, lang: CodeLang): ReactNode[] {
  if (lang === 'text') return [line];
  const rules = RULES[lang];
  const out: ReactNode[] = [];
  let i = 0;
  let plain = '';
  const flush = () => {
    if (plain) out.push(plain);
    plain = '';
  };
  while (i < line.length) {
    let matched = false;
    for (const [cls, re] of rules) {
      re.lastIndex = i;
      const m = re.exec(line);
      if (m && m[0].length > 0) {
        flush();
        out.push(
          cls === 'id' ? (
            m[0]
          ) : (
            <span key={i} className={`tk-${cls}`}>
              {m[0]}
            </span>
          ),
        );
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      plain += line[i];
      i++;
    }
  }
  flush();
  return out;
}
