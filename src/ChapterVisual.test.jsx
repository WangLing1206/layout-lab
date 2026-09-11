import React from "react";
import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ChapterGraphic from "./ChapterVisual";
import { LanguageContext } from "./i18n";
import { getChapter } from "./course";
afterEach(cleanup);
const renderGraphic = (id, lang = "zh") =>
  render(
    <LanguageContext.Provider
      value={{ lang, setLang: () => {}, t: (key) => key }}
    >
      <ChapterGraphic chapter={getChapter(id)} />
    </LanguageContext.Provider>,
  );
it("uses semantic box model labels instead of numbered tiles", () => {
  renderGraphic("box-model");
  expect(screen.getByText("margin")).toBeTruthy();
  expect(screen.getByText("border")).toBeTruthy();
  expect(screen.getByText("padding")).toBeTruthy();
  expect(screen.getByText("content")).toBeTruthy();
});
it("renders a semantic page skeleton", () => {
  renderGraphic("patterns");
  ["header", "aside", "main", "footer"].forEach((label) =>
    expect(screen.getByText(label)).toBeTruthy(),
  );
});
it("renders English layout labels", () => {
  renderGraphic("flow", "en");
  expect(screen.getByText("Block")).toBeTruthy();
  expect(screen.getByText("Inline-block")).toBeTruthy();
});
