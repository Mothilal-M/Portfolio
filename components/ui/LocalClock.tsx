"use client";

import { useEffect, useState } from "react";

/** Owner's local time (IST). Renders empty until mounted to avoid hydration mismatch. */
export function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs tracking-wider text-muted tabular-nums">
      {time ? `${time} IST` : "—:—:— IST"}
    </span>
  );
}
