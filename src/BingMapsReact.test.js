import React from "react";
import { mount } from "enzyme";
import BingMapsReact from "./components/BingMapsReact";

it("renders without crashing", () => {
  mount(<BingMapsReact />);
});
