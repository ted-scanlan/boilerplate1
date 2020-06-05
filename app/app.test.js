/* eslint-env jest */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./app.js";

describe("App", () => {
  it("finds title", () => {
    const { getByTestId } = render(<App />); // asFragment is the chunk of html that the component, App, rendered
    const elem = getByTestId("title");
    expect(elem).toHaveTextContent("My React application boilerplate");
  });
  it("finds react logo", () => {
    const { getByTestId } = render(<App />);
    const elem = getByTestId("logo");
    expect(elem).toBeInTheDocument();
  });
});
