import type { Lang } from "@/i18n/translations";

export type AnalyticsEvent = "cv_download" | "case_study_download" | "contact_submit" | "email_click" | "phone_click" | "linkedin_click" | "language_change";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function isAnalyticsHost(hostname: string): boolean {
  return ["ulugbek-kalandarov.github.io", "ulugbek-kalandarov.lovable.app"].includes(hostname.toLowerCase());
}

// The GA Measurement ID is a public tracking identifier, not an API credential.
export function initializeAnalytics(measurementId: string | null) {
  if (typeof window === "undefined" || !isAnalyticsHost(window.location.hostname) || !measurementId) return;
  try {
    if (document.getElementById("portfolio-ga4")) return;
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = function () {
      analyticsWindow.dataLayer?.push(arguments);
    };
    analyticsWindow.gtag("set", "developer_id.dZjgwMW", true);
    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("config", measurementId);
    const script = document.createElement("script");
    script.id = "portfolio-ga4";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onerror = () => { /* Tracking must never affect the portfolio. */ };
    document.head.appendChild(script);
  } catch { /* Analytics is optional, including when blocked. */ }
}

export function trackEvent(event: AnalyticsEvent, language: Lang) {
  if (typeof window === "undefined" || !isAnalyticsHost(window.location.hostname)) return;
  try {
    (window as AnalyticsWindow).gtag?.("event", event, { language });
  } catch { /* A blocked or unavailable tracker must not interrupt any action. */ }
}