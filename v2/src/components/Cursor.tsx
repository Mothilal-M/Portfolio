import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'link' | 'copy' | 'drag';

const MODE_FROM_ATTR: Record<string, CursorMode> = {
  link: 'link',
  copy: 'copy',
  drag: 'drag',
};

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce || !hover) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    setReady(true);
    document.documentElement.classList.add('has-custom-cursor');

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let rafId = 0;
    const EASE = 0.18;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };

    const tick = () => {
      ringX += (targetX - ringX) * EASE;
      ringY += (targetY - ringY) * EASE;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const resolveMode = (el: Element | null): CursorMode => {
      if (!el) return 'default';
      const explicit = (el.closest('[data-cursor]') as HTMLElement | null)?.dataset.cursor;
      if (explicit && MODE_FROM_ATTR[explicit]) return MODE_FROM_ATTR[explicit];
      if (el.closest('a, button, [role="button"], input, textarea, summary')) return 'link';
      return 'default';
    };

    const onOver = (e: Event) => setMode(resolveMode(e.target as Element));
    const onOut = () => setMode('default');
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        data-mode={mode}
        className="cursor-ring"
        aria-hidden="true"
      />
    </>
  );
}
