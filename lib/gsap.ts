import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

// Register once, client-side only. All components import gsap from here.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);
  // Mobile address-bar show/hide fires resize events that would re-measure pins
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Charset for terminal-style decode effects */
export const SCRAMBLE_CHARS = "01<>[]{}#$_/\\|=+*";

export { gsap, ScrollTrigger, SplitText, useGSAP };
