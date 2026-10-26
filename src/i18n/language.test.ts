import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { englishProjectType, resolveLanguage } from "./language";

describe("visitor language", () => {
  test("defaults to English", () => { assert.equal(resolveLanguage(undefined, undefined), "en"); });
  test("remembers a valid visitor choice", () => { assert.equal(resolveLanguage(undefined, "uz"), "uz"); });
  test("shared Korean link overrides saved Uzbek", () => { assert.equal(resolveLanguage("ko", "uz"), "ko"); });
  test("shared Uzbek link overrides saved Korean", () => { assert.equal(resolveLanguage("uz", "ko"), "uz"); });
  test("invalid language falls back to English", () => { assert.equal(resolveLanguage("fr", "de"), "en"); });
});

test("email project types remain English", () => {
  assert.equal(englishProjectType("Meta Ads Management"), "Meta Ads Management");
  assert.equal(englishProjectType("B2B Campaign"), "B2B Campaign");
  assert.equal(englishProjectType("Other"), "Other");
});