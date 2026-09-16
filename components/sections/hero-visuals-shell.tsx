// Orbiting tech-icon rings (OrbitalSystem/TechOrbit) were removed from the
// hero: on real viewport widths their icons drifted over the headline and
// subheading text, and stacking them with the starfield + gradients made the
// hero read as cluttered rather than confident. A calm gradient backdrop is
// enough here -- the content should be the only thing competing for
// attention above the fold.
export function HeroVisualsShell() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(72%_60%_at_50%_38%,rgba(0,217,255,0.08),transparent_72%),linear-gradient(180deg,#050816_0%,#070d1d_100%)]" />
    </div>
  )
}
