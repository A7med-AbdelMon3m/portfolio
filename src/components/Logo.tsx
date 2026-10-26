export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="10" fill="rgb(var(--ink))" />
      <path d="M13 51 32 11 51 51" fill="none" stroke="rgb(var(--sheet))" strokeWidth="5.5" strokeMiterlimit="10" />
      <path d="M21 40.5H43" fill="none" stroke="rgb(var(--amber))" strokeWidth="4.5" />
    </svg>
  );
}
