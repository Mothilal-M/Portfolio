/**
 * Lightweight Google Analytics (GA4) event tracker.
 * Safely calls window.gtag if present without breaking when ad-blockers are active.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "js",
      action: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackEvent(
  action: string,
  params?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
  },
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: params?.category,
      event_label: params?.label,
      value: params?.value,
      ...params,
    });
  }
}
