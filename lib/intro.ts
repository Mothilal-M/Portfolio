// Tiny event bus connecting the preloader's exit to the hero intro
// timeline — race-safe regardless of which component mounts first.

type Callback = () => void;

let fired = false;
const callbacks: Callback[] = [];

export function fireIntro() {
  if (fired) return;
  fired = true;
  callbacks.splice(0).forEach((cb) => cb());
}

export function onIntro(cb: Callback): () => void {
  if (fired) {
    cb();
    return () => {};
  }
  callbacks.push(cb);
  return () => {
    const i = callbacks.indexOf(cb);
    if (i !== -1) callbacks.splice(i, 1);
  };
}
