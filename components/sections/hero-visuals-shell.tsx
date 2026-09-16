// Orbiting tech-icon rings (OrbitalSystem/TechOrbit) were removed from the
// hero: on real viewport widths their icons drifted over the headline and
// subheading text, and stacking them with the starfield + gradients made the
// hero read as cluttered rather than confident.
//
// This veil used to be fully opaque (#050816 -> #070d1d, alpha 1), which
// completely hid the global constellation canvas (mounted once in the root
// layout, painting behind all page content) for the entire hero -- the
// site's one signature visual moment didn't show up until a visitor
// scrolled past the fold. The veil is translucent now so the stars read
// through at reduced strength: present from the first frame, still dim
// enough to keep hero text at full contrast.
export function HeroVisualsShell() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(72%_60%_at_50%_38%,rgba(0,217,255,0.10),transparent_72%),linear-gradient(180deg,rgba(5,8,22,0.45)_0%,rgba(7,13,29,0.65)_100%)]" />
    </div>
  )
}
