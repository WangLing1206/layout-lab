import React from "react";
import { afterEach, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
afterEach(() => {
  cleanup();
  localStorage.clear();
});
it("shows the renamed bilingual classroom", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "页面布局，从理解到创造。" }),
  ).toBeTruthy();
  expect(screen.getByText("页面布局课堂")).toBeTruthy();
  expect(screen.queryByText(/实验室|LayoutLab/)).toBeNull();
});
it("groups chapters into the approved learning stages", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByRole("heading", { name: "布局基础" })).toBeTruthy();
  expect(screen.getByRole("heading", { name: "现代布局" })).toBeTruthy();
  expect(screen.getByRole("heading", { name: "综合应用" })).toBeTruthy();
});
it("switches to English and persists the language", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByText("EN"));
  expect(
    screen.getByRole("heading", {
      name: "Layout, from understanding to creation.",
    }),
  ).toBeTruthy();
  expect(screen.getByText("Layout Classroom")).toBeTruthy();
  expect(localStorage.getItem("layout-language")).toBe("en");
});
it("opens an English deep link directly", () => {
  render(
    <MemoryRouter initialEntries={["/?lang=en"]}>
      <App />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", {
      name: "Layout, from understanding to creation.",
    }),
  ).toBeTruthy();
  expect(screen.getByText("Courses")).toBeTruthy();
});
it("opens a nested knowledge route directly", () => {
  render(
    <MemoryRouter initialEntries={["/course/grid/knowledge"]}>
      <App />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "二维布局的坐标系" }),
  ).toBeTruthy();
  expect(screen.getByLabelText("Grid 网格布局动态布局演示")).toBeTruthy();
});
it("handles an unknown chapter", () => {
  render(
    <MemoryRouter initialEntries={["/course/missing"]}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByText("这个页面还没有布局")).toBeTruthy();
});
it("saves progress after a correct challenge answer", () => {
  localStorage.clear();
  render(
    <MemoryRouter initialEntries={["/practice/grid"]}>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByRole("radio", { name: /repeat/ }));
  fireEvent.click(screen.getByRole("button", { name: "提交答案" }));
  expect(screen.getByText("回答正确，已记录学习进度")).toBeTruthy();
  expect(JSON.parse(localStorage.getItem("layout-progress"))).toEqual(["grid"]);
});
it("filters the catalogue by a CSS keyword", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.change(screen.getByLabelText("搜索章节或 CSS 属性"), {
    target: { value: "minmax" },
  });
  expect(
    screen
      .getAllByRole("link")
      .filter((a) => a.classList.contains("chapter-card")),
  ).toHaveLength(2);
});
