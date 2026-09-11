import { describe, expect, it } from "vitest";
import { chapters } from "./course";
import { getKnowledgeDetail, knowledgeDetails } from "./knowledge";
const bilingual = (value) =>
  value && typeof value.zh === "string" && typeof value.en === "string";
describe("knowledge details", () => {
  it("provides observe and caution guidance for every concept", () => {
    chapters.forEach((chapter) => {
      expect(knowledgeDetails[chapter.id]).toHaveLength(
        chapter.concepts.length,
      );
      chapter.concepts.forEach((_, index) => {
        const detail = getKnowledgeDetail(chapter.id, index);
        expect(bilingual(detail.observe)).toBe(true);
        expect(bilingual(detail.caution)).toBe(true);
      });
    });
  });
});
