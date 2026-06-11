import type Lenis from "lenis";

// Shared Lenis handle so the preloader can stop/start scrolling
// without prop-drilling through server components.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
