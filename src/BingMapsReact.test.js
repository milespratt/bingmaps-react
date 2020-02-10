import React from "react";
import ReactDOM from "react-dom";
import BingMapsReact from "./components/BingMapsReact";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BingMapsReact />, div);
});

test("matches the snapshot", () => {
  const component = renderer.create(<BingMapsReact />);
  const JSONComponent = component.toJSON();
  expect(JSONComponent).toMatchSnapshot();
});
