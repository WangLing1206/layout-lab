import React from "react";
import { afterEach, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
afterEach(cleanup);
it("shows the course catalogue", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { name: "页面布局，从理解到创造。" }),
  ).toBeTruthy();
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
});
it("handles an unknown chapter", () => {
  render(
    <MemoryRouter initialEntries={["/course/missing"]}>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByText("这个页面还没有布局")).toBeTruthy();
});
it("saves progress after a correct challenge answer", async () => {
  const { fireEvent } = await import("@testing-library/react");
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
it("filters the catalogue by a CSS keyword", async () => {
  const { fireEvent } = await import("@testing-library/react");
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.change(screen.getByLabelText("搜索章节"), {
    target: { value: "minmax" },
  });
  expect(
    screen
      .getAllByRole("link")
      .filter((a) => a.classList.contains("chapter-card")),
  ).toHaveLength(2);
});
