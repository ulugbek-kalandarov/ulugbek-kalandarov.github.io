import { createServerFn } from "@tanstack/react-start";

// Intentionally expose only this public GA identifier for browser tracking.
export const getAnalyticsMeasurementId = createServerFn({ method: "GET" }).handler(() => {
  const id = process.env['GOOGLE_ANALYTICS_MEASUREMENT_ID']?.trim();
  return id && /^G-[A-Z0-9]+$/.test(id) ? id : null;
});