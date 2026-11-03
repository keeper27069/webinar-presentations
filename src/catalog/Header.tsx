import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOCALES } from '@engine/types';
import { Bit } from '@engine/art/Bit';
import { LOCALE_SHORT, useLocale, useUi } from '@/i18n';
import { BRAND } from '@/config';

export function Header() {
  const locale = useLocale();
  const ui = useUi();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const switchTo = (l: string) => nav(pathname.replace(/^\/(uz|ru|en)/, `/${l}`));

  return (
    <header className="cat-header">
      <Link to={`/${locale}`} className="cat-brand">
        <Bit size={48} float={false} />
        <span>
          <b>{BRAND.name}</b>
          <small>{ui.brandTagline}</small>
        </span>
      </Link>
      <div className="cat-langs" role="group" aria-label="language">
        {LOCALES.map((l) => (
          <button key={l} className={l === locale ? 'is-active' : ''} onClick={() => switchTo(l)}>
            {LOCALE_SHORT[l]}
          </button>
        ))}
      </div>
    </header>
  );
}
