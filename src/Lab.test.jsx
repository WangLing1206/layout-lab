import React from "react";
import { afterEach, it, expect } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Lab from "./Lab";
import { getChapter } from "./course";
afterEach(cleanup);
it("updates preview from CSS editing and resets", () => {
  render(<Lab chapter={getChapter("grid")} />);
  fireEvent.click(screen.getByRole("button", { name: "编辑代码" }));
  fireEvent.change(screen.getByLabelText("CSS editor"), {
    target: { value: ".stage {display: block;}" },
  });
  expect(screen.getByTitle("实时布局预览").getAttribute("srcdoc")).toContain(
    "display: block",
  );
  fireEvent.click(screen.getByRole("button", { name: "重置实验" }));
  expect(screen.getByTitle("实时布局预览").getAttribute("srcdoc")).toContain(
    "repeat(3, 1fr)",
  );
});
it("updates a parameter with keyboard input", () => {
  render(<Lab chapter={getChapter("grid")} />);
  fireEvent.keyDown(screen.getByRole("slider", { name: "列数 columns" }), {
    key: "ArrowRight",
    keyCode: 39,
    which: 39,
  });
  expect(screen.getByTitle("实时布局预览").getAttribute("srcdoc")).toContain(
    "repeat(4, 1fr)",
  );
});
