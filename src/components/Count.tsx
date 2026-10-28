/** Counts up from 0 when scrolled into view. The final value is the server-rendered text. */
export function Count({ value }: { value: number }) {
  return (
    <span data-count={value} dir="ltr">
      {value}
    </span>
  );
}
