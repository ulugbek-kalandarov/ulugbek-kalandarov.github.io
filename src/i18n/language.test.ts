import { describe, expect, test } from "bun:test";
import { englishProjectType, resolveLanguage } from "./language";

describe("visitor language", () => {
  test("defaults to English", () => { expect(resolveLanguage(undefined, undefined)).toBe("en"); });
  test("remembers a valid visitor choice", () => { expect(resolveLanguage(undefined, "uz")).toBe("uz"); });
  test("shared Korean link overrides saved Uzbek", () => { expect(resolveLanguage("ko", "uz")).toBe("ko"); });
  test("shared Uzbek link overrides saved Korean", () => { expect(resolveLanguage("uz", "ko")).toBe("uz"); });
  test("invalid language falls back to English", () => { expect(resolveLanguage("fr", "de")).toBe("en"); });
});

test("email project types remain English", () => {
  expect(englishProjectType("Meta Ads Management")).toBe("Meta Ads Management");
  expect(englishProjectType("B2B Campaign")).toBe("B2B Campaign");
  expect(englishProjectType("Other")).toBe("Other");
});