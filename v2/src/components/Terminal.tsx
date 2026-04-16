import { useEffect, useState } from 'react';

const COMMANDS: { prompt: string; output: string }[] = [
  { prompt: 'whoami', output: 'mothilal — software engineer · backend · gcp' },
  {
    prompt: 'curl /api/me',
    output: '{ "status": "available", "open_to": ["backend", "platform"] }',
  },
  {
    prompt: 'ls ./work',
    output: 'college-admission-seat-matrix/   portfolio-website/   10xmindplay/',
  },
  { prompt: 'cat ethos.md', output: 'ship calm. scale quiet.' },
];

type Entry = { prompt: string; output: string };

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [typed, setTyped] = useState('');
  const [caretOn, setCaretOn] = useState(true);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCaretOn((v) => !v), 520);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setEntries(COMMANDS);
      setRunning(false);
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    (async () => {
      // Small delay so the mount animation settles first.
      await sleep(450);
      for (const cmd of COMMANDS) {
        if (cancelled) return;
        for (let i = 1; i <= cmd.prompt.length; i++) {
          if (cancelled) return;
          setTyped(cmd.prompt.slice(0, i));
          await sleep(28 + Math.random() * 55);
        }
        await sleep(240);
        if (cancelled) return;
        setEntries((prev) => [...prev, { prompt: cmd.prompt, output: cmd.output }]);
        setTyped('');
        await sleep(620);
      }
      if (!cancelled) setRunning(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      role="group"
      aria-label="Live terminal demo"
      className="font-mono w-full rounded-lg border border-rule/40 bg-fg/[0.02] p-5 text-sm shadow-[0_40px_80px_-40px_rgb(var(--signal)/0.18)] backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center gap-2 text-xs">
        <span className="inline-block h-2 w-2 rounded-full bg-red-400/60" aria-hidden="true" />
        <span className="inline-block h-2 w-2 rounded-full bg-yellow-400/60" aria-hidden="true" />
        <span className="inline-block h-2 w-2 rounded-full bg-signal/70" aria-hidden="true" />
        <span className="ml-2 muted">~/mothilal — zsh</span>
      </div>

      <div className="leading-relaxed min-h-[220px] space-y-2.5">
        {entries.map((e, i) => (
          <div key={i}>
            <div>
              <span className="text-signal">➜</span> {e.prompt}
            </div>
            <div className="muted whitespace-pre-wrap">{e.output}</div>
          </div>
        ))}

        <div>
          <span className="text-signal">➜</span> {typed}
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block align-middle"
            style={{
              width: '0.55em',
              height: '1em',
              background: 'rgb(var(--signal))',
              opacity: caretOn ? 1 : 0,
              transition: 'opacity 80ms linear',
              marginBottom: '-2px',
            }}
          />
        </div>

        {!running && entries.length === COMMANDS.length && (
          <p className="muted mt-4 text-xs">
            <span className="signal-dot" /> idle — scroll for more
          </p>
        )}
      </div>
    </div>
  );
}
