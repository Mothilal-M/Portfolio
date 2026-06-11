const NOISE_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>`.replace(
      "%23",
      "#",
    ),
  );

/** Film-grain texture over everything. Animation defined in globals.css (motion-safe only). */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed -inset-1/2 z-[80] h-[200%] w-[200%] opacity-[0.05] mix-blend-overlay"
      style={{ backgroundImage: `url("${NOISE_SVG}")`, backgroundSize: "256px 256px" }}
    />
  );
}
