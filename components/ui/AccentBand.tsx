import { marquee } from "@/lib/content";
import { Marquee } from "./Marquee";

/** Full-bleed, slightly tilted lime ticker — the page's loudest moment. */
export function AccentBand() {
  return (
    <div aria-hidden className="relative -mx-4 overflow-hidden py-10">
      <div className="-rotate-2 bg-accent shadow-[0_0_60px_rgb(214_255_63/0.25)]">
        <Marquee
          items={marquee.band}
          separator="✦"
          speed={18}
          className="py-4 font-display text-2xl font-bold uppercase tracking-tight text-accent-ink md:text-4xl"
        />
      </div>
    </div>
  );
}
