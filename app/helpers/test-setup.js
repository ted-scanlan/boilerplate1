/* eslint-disable */
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

global.cleanup = cleanup;
global.render = render;
