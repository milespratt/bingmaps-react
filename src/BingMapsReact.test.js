import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BingMapsReact from "./components/BingMapsReact";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);
jest.useFakeTimers();

function initGlobal() {
  global.Microsoft = jest.fn();
  global.Microsoft.Maps = jest.fn();
  global.Microsoft.Maps.Map = jest.fn(() => {
    return {
      setOptions: () => {
        return;
      }
    };
  });
  global.Microsoft.Maps.NavigationBarMode = { test: 1 };
  global.Microsoft.Maps.NavigationBarOrientation = { test: 1 };
  global.Microsoft.Maps.MapTypeId = { test: 1 };
}

it("it should wait an interval for the map to load the first time", async () => {
  render(<BingMapsReact />);
  jest.advanceTimersByTime(500);
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 500);
  initGlobal();
  jest.advanceTimersByTime(500);
});

it("should skip the interval if already loaded", async () => {
  initGlobal();
  render(<BingMapsReact />);
});

it("should render with custom map options", async () => {
  initGlobal();
  render(
    <BingMapsReact
      mapOptions={{
        navigationBarMode: "test",
        navigationBarOrientation: "test",
        supportedMapTypes: ["test"]
      }}
    />
  );
});
