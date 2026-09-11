import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CodeBlock from "./CodeBlock";
afterEach(cleanup);
it("renders a highlighted code workbench and copies code", () => {
  const copy = vi.fn();
  render(
    <CodeBlock
      code={".stage { display: grid; }"}
      language="css"
      filename="grid.css"
      copyLabel="Copy code"
      onCopy={copy}
    />,
  );
  expect(screen.getByText("grid.css")).toBeTruthy();
  expect(document.querySelector(".code-highlight")).toBeTruthy();
  expect(screen.getByText("01")).toBeTruthy();
  fireEvent.click(screen.getByLabelText("Copy code"));
  expect(copy).toHaveBeenCalledOnce();
});
