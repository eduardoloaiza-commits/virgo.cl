type IconProps = {
  name: string;
  className?: string;
};

const paths: Record<string, React.ReactNode> = {
  car: (
    <>
      <path d="M5 17h14M5 17v2a1 1 0 001 1h2a1 1 0 001-1v-2M15 17v2a1 1 0 001 1h2a1 1 0 001-1v-2" />
      <path d="M4 17l1.5-5.5A2 2 0 017.4 10h9.2a2 2 0 011.9 1.5L20 17" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </>
  ),
  home: (
    <>
      <path d="M4 10l8-6 8 6v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
    </>
  ),
  trend: (
    <>
      <path d="M4 17l5-5 3 3 7-7" />
      <path d="M14 8h5v5" />
    </>
  ),
  plane: (
    <>
      <path d="M10 21l2-5 8-8a2 2 0 10-3-3l-8 8-5 2 1 3 2 1 3 2z" />
    </>
  ),
  paw: (
    <>
      <circle cx="6" cy="10" r="1.8" />
      <circle cx="18" cy="10" r="1.8" />
      <circle cx="9" cy="6" r="1.8" />
      <circle cx="15" cy="6" r="1.8" />
      <path d="M8 16c0-2.5 1.8-4 4-4s4 1.5 4 4c0 2-1.5 3-4 3s-4-1-4-3z" />
    </>
  ),
  users: (
    <>
      <circle cx="8" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M3 20c0-3 2.3-5 5-5s5 2 5 5" />
      <path d="M14 20c0-2.3 1.8-4 3.5-4s3.5 1.7 3.5 4" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a5 5 0 0010 0V3" />
      <path d="M16 14a4 4 0 014 4v1a3 3 0 01-3 3 3 3 0 01-3-3v-2" />
      <circle cx="6" cy="3" r="1" />
      <circle cx="16" cy="3" r="1" />
    </>
  ),
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9v11h18V9" />
      <path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="17" r="3.5" />
      <circle cx="18" cy="17" r="3.5" />
      <path d="M6 17l4-8h5l3 8" />
      <path d="M10 9h3" />
      <path d="M15 9l-1-3h-2" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M5 6h14" />
      <path d="M5 6l-3 6a3 3 0 006 0z" />
      <path d="M19 6l-3 6a3 3 0 006 0z" />
      <path d="M8 21h8" />
    </>
  ),
  bandaid: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="2" transform="rotate(-20 12 12)" />
      <path d="M9 11l6 2" />
      <circle cx="10.5" cy="10.5" r="0.5" />
      <circle cx="13.5" cy="13.5" r="0.5" />
    </>
  ),
};

export function ProductIcon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.shield}
    </svg>
  );
}
