/** A fixed amber conductor that fills as the page is scrolled. Driven by --progress on <html>. */
export function EnergyRail() {
  return (
    <div aria-hidden="true" className="rail">
      <div className="rail-fill" />
      <div className="rail-head" />
    </div>
  );
}
