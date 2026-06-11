/**
 * Static stand-in for the 3D hero scene: warm radial glow + dot field.
 * Shown while the R3F bundle loads, when WebGL is unavailable, and
 * under prefers-reduced-motion. Occupies the same box as the Canvas
 * so swapping causes zero layout shift.
 */
export function SceneFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 65% 45%, rgb(214 255 63 / 7%), transparent 70%)," +
            "radial-gradient(ellipse 50% 60% at 70% 60%, rgb(32 29 24 / 80%), transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgb(163 157 146 / 18%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 55% 55% at 65% 50%, black, transparent 75%)",
        }}
      />
    </div>
  );
}
