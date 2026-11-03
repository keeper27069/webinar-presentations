import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { html as htmlLang } from '@codemirror/lang-html';
import { css as cssLang } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { useSceneState } from '../scene/hooks';

export interface CodeFiles {
  html?: string;
  css?: string;
  js?: string;
}
export interface CodeStep {
  label: string;
  files: CodeFiles;
}

interface Props {
  files: CodeFiles;
  /** Pre-recorded code states the mentor can jump between instead of typing */
  steps?: CodeStep[];
  name?: string;
  /** Show the console panel (default: when there is JS) */
  console?: boolean;
  /** Hide the visual preview (console-only JS demos) */
  preview?: boolean;
  editorHeight?: number;
  /** Shown above the editor */
  task?: ReactNode;
}

type Tab = keyof CodeFiles;
interface LogLine {
  type: 'log' | 'error' | 'guard';
  text: string;
}

const GUARD = '__LOOP_GUARD__';

/** Inject an iteration counter into for/while loops so an infinite loop cannot freeze the stream. */
export function guardLoops(js: string): string {
  return js.replace(/\b(for|while)\s*\(((?:[^()]|\([^()]*\))*)\)\s*\{/g, (_m, kw, cond) => `${kw} (${cond}) { if (++__lg > 10000) throw new Error('${GUARD}');`);
}

/**
 * The preview runs in an opaque-origin sandbox where the real localStorage throws.
 * A small shim keeps the data here, in the presenter page, so it survives ▶ Run
 * (which recreates the frame — just like a page reload) and works offline.
 */
const STORE: Record<string, string> = {};
const LS_SHIM = `var __s=__STORE__;function __p(){parent.postMessage({__lc:ch,type:'__ls',store:__s},'*')}
var __ls={getItem:function(k){k=String(k);return Object.prototype.hasOwnProperty.call(__s,k)?__s[k]:null},setItem:function(k,v){__s[String(k)]=String(v);__p()},removeItem:function(k){delete __s[String(k)];__p()},clear:function(){Object.keys(__s).forEach(function(k){delete __s[k]});__p()},key:function(i){var a=Object.keys(__s);return i<a.length?a[i]:null}};
Object.defineProperty(__ls,'length',{get:function(){return Object.keys(__s).length}});
try{Object.defineProperty(window,'localStorage',{value:__ls,configurable:true})}catch(e){}`;

function buildDoc(files: CodeFiles, channel: string) {
  const js = files.js ? guardLoops(files.js) : '';
  return `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;font-family:Manrope,system-ui,sans-serif;font-size:22px;color:#0d1238;background:#fff}
body{padding:24px}
${files.css ?? ''}</style></head><body>${files.html ?? ''}
<script>(function(){var ch=${JSON.stringify(channel)};function f(v){if(typeof v==='string')return v;try{return JSON.stringify(v)}catch(e){return String(v)}}
function send(t,a){parent.postMessage({__lc:ch,type:t,text:Array.prototype.map.call(a,f).join(' ')},'*')}
console.log=function(){send('log',arguments)};console.info=console.log;console.warn=console.log;console.error=function(){send('error',arguments)};
window.onerror=function(m){var s=String(m);send(s.indexOf('${GUARD}')>=0?'guard':'error',[s.replace('Uncaught ','')]);return true};
${LS_SHIM.replace('__STORE__', JSON.stringify(STORE).replace(/</g, '\\u003c'))}})();</script>
<script>let __lg=0;
${js}</script></body></html>`;
}

/** Smaller editor font for long files so more fits on the stream frame */
function cmFont(src: string) {
  const lines = src.split('\n').length;
  return lines > 16 ? 20 : lines > 11 ? 23 : 26;
}

export function LiveCode({ files, steps, name = 'live', console: showConsole, preview = true, editorHeight = 560, task }: Props) {
  const ui = useUi();
  const channel = useId();
  const [code, setCode] = useSceneState<CodeFiles>(`${name}:code`, files);
  const tabs = (['html', 'css', 'js'] as Tab[]).filter((t) => code[t] !== undefined);
  const [tab, setTab] = useState<Tab>(tabs.includes('js') ? 'js' : tabs[0]);
  const [stepIdx, setStepIdx] = useSceneState<number>(`${name}:step`, -1);
  const [doc, setDoc] = useState(() => buildDoc(code, channel));
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [runId, setRunId] = useState(0);
  const hasJs = code.js !== undefined;
  const consoleOn = showConsole ?? hasJs;
  const logEnd = useRef<HTMLDivElement>(null);

  // Collect console output from the sandbox
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data as { __lc?: string; type: LogLine['type'] | '__ls'; text: string; store?: Record<string, string> };
      if (!d || d.__lc !== channel) return;
      if (d.type === '__ls') {
        Object.keys(STORE).forEach((k) => delete STORE[k]);
        Object.assign(STORE, d.store ?? {});
        return;
      }
      setLogs((l) => [...l, { type: d.type, text: d.text }].slice(-300));
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [channel]);

  useEffect(() => {
    const el = logEnd.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  // HTML/CSS update live; JS only on Run
  const visualKey = `${code.html ?? ''}\u0000${code.css ?? ''}`;
  useEffect(() => {
    if (hasJs) return;
    const t = window.setTimeout(() => setDoc(buildDoc(code, channel)), 350);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualKey]);

  const run = () => {
    setLogs([]);
    setDoc(buildDoc(code, channel));
    setRunId((r) => r + 1);
  };

  const exts = useMemo(() => ({ html: [htmlLang(), EditorView.lineWrapping], css: [cssLang(), EditorView.lineWrapping], js: [javascript(), EditorView.lineWrapping] }), []);

  return (
    <div className={`live ${preview ? '' : 'live--no-preview'}`}>
      <div className="live__editor">
        {task && <div className="live__task">{task}</div>}
        <div className="live__tabs">
          {tabs.map((t) => (
            <button key={t} className={`live__tab ${t === tab ? 'is-active' : ''}`} onClick={() => setTab(t)}>
              {t === 'js' ? 'script.js' : t === 'css' ? 'style.css' : 'index.html'}
            </button>
          ))}
          <span className="live__spacer" />
          {hasJs && (
            <button className="btn btn--accent btn--sm" onClick={run}>
              ▶ {ui.run}
            </button>
          )}
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => {
              const base = stepIdx >= 0 && steps ? steps[stepIdx].files : files;
              setCode(base);
              setLogs([]);
            }}
            title={ui.reset}
          >
            ↺
          </button>
        </div>
        <div className="live__cmwrap" data-allow-overflow style={{ maxHeight: editorHeight, fontSize: cmFont(code[tab] ?? '') }}>
        <CodeMirror
          value={code[tab] ?? ''}
          height="100%"
          theme={tokyoNight}
          extensions={exts[tab]}
          basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true, autocompletion: false }}
          onChange={(v) => setCode((c) => ({ ...c, [tab]: v }))}
          className="live__cm"
        />
        </div>
        {steps && steps.length > 0 && (
          <div className="live__steps">
            {steps.map((s, i) => (
              <button
                key={i}
                className={`seg ${i === stepIdx ? 'is-active' : ''}`}
                onClick={() => {
                  setStepIdx(i);
                  setCode(s.files);
                  setLogs([]);
                  if (s.files.js !== undefined) window.setTimeout(() => setDoc(buildDoc(s.files, channel)), 0);
                }}
              >
                {i + 1}. {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="live__out">
        {preview && (
          <div className="live__preview">
            <div className="live__label">{ui.preview}</div>
            <iframe key={runId} title="preview" sandbox="allow-scripts" srcDoc={doc} />
          </div>
        )}
        {consoleOn && (
          <div className="live__console">
            <div className="live__label">{ui.console}</div>
            <div className="live__logs">
              {preview === false && <iframe key={runId} title="runner" sandbox="allow-scripts" srcDoc={doc} className="live__hidden-frame" />}
              <AnimatePresence initial={false}>
                {logs.map((l, i) => (
                  <motion.div
                    key={`${runId}-${i}`}
                    className={`live__log is-${l.type}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: Math.min(i, 30) * 0.03 }}
                  >
                    {l.type === 'guard' ? `⛔ ${ui.loopGuard}` : l.type === 'error' ? `⚠ ${l.text}` : l.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={logEnd} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
