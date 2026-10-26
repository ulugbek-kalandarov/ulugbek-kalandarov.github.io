import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { isAnalyticsHost, trackEvent } from "./analytics";

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