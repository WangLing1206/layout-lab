import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import DynamicStage from "./Stage";
import { LanguageContext } from "./i18n";
import { getChapter } from "./course";
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
const provider = (lang) => ({ lang, setLang: () => {}, t: (key) => key });
it("advances, pauses, and replays layout motion", () => {
  vi.useFakeTimers();
  render(
    <LanguageContext.Provider value={provider("zh")}>
      <DynamicStage chapter={getChapter("grid")} />
    </LanguageContext.Provider>,
  );
  expect(screen.getByText("一列轨道")).toBeTruthy();
  act(() => vi.advanceTimersByTime(2600));
  expect(screen.getByText("两列轨道")).toBeTruthy();
  fireEvent.click(screen.getByLabelText("暂停动画"));
  act(() => vi.advanceTimersByTime(5200));
  expect(screen.getByText("两列轨道")).toBeTruthy();
  fireEvent.click(screen.getByLabelText("重新播放"));
  expect(screen.getByText("一列轨道")).toBeTruthy();
});
it("uses English captions after switching language", () => {
  render(
    <LanguageContext.Provider value={provider("en")}>
      <DynamicStage chapter={getChapter("grid")} />
    </LanguageContext.Provider>,
  );
  expect(screen.getByText("One track")).toBeTruthy();
  expect(screen.getByLabelText("Pause animation")).toBeTruthy();
});
