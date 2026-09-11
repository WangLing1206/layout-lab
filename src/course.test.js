import { describe, it, expect } from "vitest";
import { chapters, getChapter, makeCss, readProgress } from "./course";
describe("course contract", () => {
  it("contains eight unique complete chapters", () => {
    expect(chapters).toHaveLength(8);
    expect(new Set(chapters.map((c) => c.id)).size).toBe(8);
    chapters.forEach((c) => {
      expect(c.concepts.length).toBeGreaterThanOrEqual(3);
      expect(c.html).toContain("<");
      expect(c.question.answer).toBeTypeOf("number");
    });
  });
  it("rejects unknown chapters", () =>
    expect(getChapter("missing")).toBeUndefined());
  it("generates live grid CSS", () =>
    expect(makeCss(getChapter("grid"), { columns: 4, gap: 24 })).toContain(
      "repeat(4, 1fr)",
    ));
  it("tolerates invalid stored progress", () =>
    expect(readProgress({ getItem: () => "{oops" })).toEqual([]));
  it("filters unrecognized progress IDs", () =>
    expect(
      readProgress({ getItem: () => JSON.stringify(["grid", "bad", "grid"]) }),
    ).toEqual(["grid"]));
});
