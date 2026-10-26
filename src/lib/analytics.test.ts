import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { isAnalyticsHost, trackEvent, type AnalyticsEvent } from "./analytics";

describe("GA4 live host allowlist", () => {
  test("tracks on the GitHub live site", () => assert.equal(isAnalyticsHost("ulugbek-kalandarov.github.io"), true));
  test("tracks on the Lovable live site", () => assert.equal(isAnalyticsHost("ulugbek-kalandarov.lovable.app"), true));
  test("never tracks on editor, draft or commit previews", () => {
    for (const host of ["localhost", "id-preview--22c28d2e-4c23-45ba-a25a-207858c43b3a.lovable.app", "id-preview-6--22c28d2e-4c23-45ba-a25a-207858c43b3a.lovable.app", "id-preview-abc123--22c28d2e-4c23-45ba-a25a-207858c43b3a.lovable.app", "preview--ulugbek-kalandarov.lovable.app", "ulugbek-kalandarov.lovable.app.attacker.test"]) {
      assert.equal(isAnalyticsHost(host), false, host);
    }
  });
  test("tracking is safe during server rendering", () => assert.doesNotThrow(() => trackEvent("cv_download", "en")));
});

describe("GA4 language parameters", () => {
  const events: AnalyticsEvent[] = ["cv_download", "case_study_download", "contact_submit", "email_click", "phone_click", "linkedin_click", "language_change"];
  for (const event of events) {
    test(`${event} includes the selected language`, () => {
      const original = Object.getOwnPropertyDescriptor(globalThis, "window");
      const calls: unknown[][] = [];
      Object.defineProperty(globalThis, "window", { configurable: true, value: { location: { hostname: "ulugbek-kalandarov.lovable.app" }, gtag: (...args: unknown[]) => calls.push(args) } });
      try {
        for (const language of ["en", "ko", "uz"] as const) trackEvent(event, language);
        assert.deepEqual(calls, ["en", "ko", "uz"].map((language) => ["event", event, { language }]));
      } finally {
        if (original) Object.defineProperty(globalThis, "window", original);
        else Reflect.deleteProperty(globalThis, "window");
      }
    });
  }
  test("a blocked tracker cannot interrupt visitor actions", () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, "window");
    Object.defineProperty(globalThis, "window", { configurable: true, value: { location: { hostname: "ulugbek-kalandarov.github.io" }, gtag: () => { throw new Error("Blocked"); } } });
    try { assert.doesNotThrow(() => trackEvent("language_change", "ko")); }
    finally {
      if (original) Object.defineProperty(globalThis, "window", original);
      else Reflect.deleteProperty(globalThis, "window");
    }
  });
});