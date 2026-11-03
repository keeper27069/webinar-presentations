import { motion } from 'framer-motion';

export type BitMood = 'happy' | 'thinking' | 'surprised' | 'worried' | 'proud';

/** Bit — the original robot-explorer mascot shared by all lessons. */
export function Bit({ size = 220, mood = 'happy', float = true }: { size?: number; mood?: BitMood; float?: boolean }) {
  const eyes =
    mood === 'surprised' ? (
      <>
        <circle cx="78" cy="104" r="15" fill="#0a0f2e" />
        <circle cx="122" cy="104" r="15" fill="#0a0f2e" />
        <circle cx="82" cy="99" r="5" fill="#fff" />
        <circle cx="126" cy="99" r="5" fill="#fff" />
      </>
    ) : mood === 'thinking' ? (
      <>
        <circle cx="80" cy="102" r="11" fill="#0a0f2e" />
        <circle cx="124" cy="102" r="11" fill="#0a0f2e" />
        <circle cx="85" cy="97" r="4" fill="#fff" />
        <circle cx="129" cy="97" r="4" fill="#fff" />
        <path d="M66 84 L92 88" stroke="#0a0f2e" strokeWidth="6" strokeLinecap="round" />
      </>
    ) : mood === 'worried' ? (
      <>
        <circle cx="78" cy="106" r="11" fill="#0a0f2e" />
        <circle cx="122" cy="106" r="11" fill="#0a0f2e" />
        <circle cx="81" cy="102" r="4" fill="#fff" />
        <circle cx="125" cy="102" r="4" fill="#fff" />
        <path d="M64 88 L90 82 M136 88 L110 82" stroke="#0a0f2e" strokeWidth="6" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d={mood === 'proud' ? 'M66 104 Q78 90 90 104' : 'M66 102 Q78 90 90 102'} stroke="#0a0f2e" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d={mood === 'proud' ? 'M110 104 Q122 90 134 104' : 'M110 102 Q122 90 134 102'} stroke="#0a0f2e" strokeWidth="8" fill="none" strokeLinecap="round" />
      </>
    );
  const mouth =
    mood === 'surprised' ? (
      <ellipse cx="100" cy="134" rx="9" ry="11" fill="#0a0f2e" />
    ) : mood === 'worried' ? (
      <path d="M84 138 Q100 128 116 138" stroke="#0a0f2e" strokeWidth="6" fill="none" strokeLinecap="round" />
    ) : mood === 'thinking' ? (
      <path d="M88 134 L114 130" stroke="#0a0f2e" strokeWidth="6" strokeLinecap="round" />
    ) : (
      <path d="M80 128 Q100 148 120 128" stroke="#0a0f2e" strokeWidth="6" fill="none" strokeLinecap="round" />
    );

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      animate={float ? { y: [0, -10, 0] } : undefined}
      transition={float ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      aria-label="Bit"
      role="img"
    >
      <ellipse cx="100" cy="210" rx="52" ry="8" fill="rgba(0,0,0,.25)" />
      <line x1="100" y1="22" x2="100" y2="50" stroke="#8fa0ff" strokeWidth="6" strokeLinecap="round" />
      <motion.circle cx="100" cy="18" r="11" fill="#ffd166" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <rect x="18" y="98" width="20" height="44" rx="10" fill="#5b6bff" />
      <rect x="162" y="98" width="20" height="44" rx="10" fill="#5b6bff" />
      <rect x="32" y="48" width="136" height="120" rx="44" fill="#7c8cff" />
      <rect x="44" y="62" width="112" height="92" rx="34" fill="#e9edff" />
      {eyes}
      {mouth}
      <circle cx="60" cy="128" r="7" fill="#ff9fd6" opacity=".7" />
      <circle cx="140" cy="128" r="7" fill="#ff9fd6" opacity=".7" />
      <rect x="66" y="166" width="68" height="34" rx="14" fill="#5b6bff" />
      <circle cx="100" cy="183" r="7" fill="#3ee6ff" />
    </motion.svg>
  );
}
