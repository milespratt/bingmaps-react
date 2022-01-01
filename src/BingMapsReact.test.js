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
  global.Microsoft.Maps.Pushpin = jest.fn(() => {
    return {
      getLocation: () => {
        return;
      },
    };
  });
  global.Microsoft.Maps.Map = jest.fn(() => {
    return {
      setOptions: () => {
        return;
      },
      setView: () => {
        return;
      },
      getCenter: () => {
        return {};
      },
      entities: {
        push: () => {
          return;
        },
        getLength: () => {
          return 1;
        },
        get: () => {
          return new global.Microsoft.Maps.Pushpin();
        },
        removeAt: () => {
          return;
        },
      },
    };
  });
  global.Microsoft.Maps.Infobox = jest.fn(() => {
    return {
      setMap: () => {
        return;
      },
    };
  });

  global.Microsoft.Maps.Events = {
    addHandler: () => {
      return;
    },
  };

  global.Microsoft.Maps.NavigationBarMode = { test: 1 };
  global.Microsoft.Maps.NavigationBarOrientation = { test: 1 };
  global.Microsoft.Maps.MapTypeId = { test: 1 };
  global.Microsoft.Maps.LabelOverlay = { hidden: 1 };
}

it("should render without any props", () => {
  render(<BingMapsReact />);
});

it("should render with custom map options", () => {
  initGlobal();
  render(
    <BingMapsReact
      mapOptions={{
        navigationBarMode: "test",
        navigationBarOrientation: "test",
        supportedMapTypes: ["test"],
      }}
    />
  );
});

it("should render with custom view options", () => {
  initGlobal();
  render(
    <BingMapsReact
      viewOptions={{ mapTypeId: "grayscale", hideRoadLabels: true }}
    />
  );
});

it("should render with push pins", () => {
  initGlobal();
  render(
    <BingMapsReact
      pushPins={[
        {
          center: {
            latitude: 42.35933,
            longitude: -71.19325,
          },
          options: {
            title: "Pushpin",
            subTitle: "Without Infobox",
          },
        },
      ]}
    />
  );
});

it("should render with push pins with info boxes", () => {
  initGlobal();
  render(
    <BingMapsReact
      pushPinsWithInfoboxes={[
        {
          center: {
            latitude: 42.35933,
            longitude: -71.19325,
          },
          options: {
            title: "Pushpin",
            subTitle: "With Infobox",
          },
        },
      ]}
    />
  );
});

it("should return the map reference on mapReady", () => {
  initGlobal();
  render(
    <BingMapsReact
      onMapReady={({ map }) => {
        expect(map).toHaveProperty("current");
        expect(Object.keys(map.current)).toEqual([
          "setOptions",
          "setView",
          "getCenter",
          "entities",
        ]);
      }}
    />
  );
});
