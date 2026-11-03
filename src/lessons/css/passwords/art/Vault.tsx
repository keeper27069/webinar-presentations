import { motion } from 'framer-motion';

/** Original vault illustration with a code display. */
export function Vault({ code = '123456', open = false, size = 560 }: { code?: string; open?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" role="img" aria-label="vault">
      <defs>
        <linearGradient id="v-body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3a4ab8" />
          <stop offset="1" stopColor="#1a2266" />
        </linearGradient>
        <radialGradient id="v-door" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#8fa0ff" />
          <stop offset="1" stopColor="#4252c9" />
        </radialGradient>
      </defs>
      <rect x="30" y="30" width="340" height="340" rx="40" fill="url(#v-body)" stroke="#8fa0ff" strokeWidth="4" />
      <rect x="54" y="54" width="292" height="292" rx="28" fill="#0d1238" />
      <motion.g style={{ originX: '60px', originY: '200px' }} animate={{ rotateY: open ? -70 : 0 }} transition={{ type: 'spring', stiffness: 60, damping: 12 }}>
        <circle cx="200" cy="200" r="128" fill="url(#v-door)" stroke="#c7d0ff" strokeWidth="5" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={200 + Math.cos(a) * 112} cy={200 + Math.sin(a) * 112} r="6" fill="#c7d0ff" />;
        })}
        <rect x="118" y="118" width="164" height="54" rx="12" fill="#0a0f2e" stroke="#3ee6ff" strokeWidth="3" />
        <text x="200" y="156" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="34" fontWeight="700" fill="#3ee6ff">
          {code}
        </text>
        <motion.g animate={{ rotate: open ? 360 : 0 }} style={{ originX: '200px', originY: '250px' }} transition={{ duration: 1 }}>
          <circle cx="200" cy="250" r="42" fill="#2a3596" stroke="#c7d0ff" strokeWidth="4" />
          <rect x="196" y="212" width="8" height="76" rx="4" fill="#c7d0ff" />
          <rect x="162" y="246" width="76" height="8" rx="4" fill="#c7d0ff" />
        </motion.g>
      </motion.g>
      {open && (
        <motion.text x="200" y="215" textAnchor="middle" fontSize="70" initial={{ scale: 0 }} animate={{ scale: 1 }}>
          💰
        </motion.text>
      )}
    </svg>
  );
}
