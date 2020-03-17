import React, { useState } from "react";
import BingMapsReact from "./components/BingMapsReact";

function App() {
  const [options, setOptions] = useState({
    allowHidingLabelsOfRoad: false,
    allowInfoboxOverflow: false,
    backgroundColor: "#EAE8E1",
    customMapStyle: {
      elements: {
        area: { fillColor: "#b6e591" },
        water: { fillColor: "#75cff0" },
        tollRoad: { fillColor: "#a964f4", strokeColor: "#a964f4" },
        arterialRoad: { fillColor: "#ffffff", strokeColor: "#d7dae7" },
        road: { fillColor: "#ffa35a", strokeColor: "#ff9c4f" },
        street: { fillColor: "#ffffff", strokeColor: "#ffffff" },
        transit: { fillColor: "#000000" }
      },
      settings: {
        landColor: "#efe9e1"
      }
    },
    disableBirdseye: false,
    disableKeyboardInput: false,
    disableMapTypeSelectorMouseOver: false,
    disablePanning: false,
    disableScrollWheelZoom: false,
    disableStreetside: false,
    disableStreetsideAutoCoverage: false,
    disableZooming: false,
    enableClickableLogo: true,
    enableCORS: false,
    enableHighDpi: false,
    enableInertia: true,
    liteMode: false,
    // maxBounds: ,
    // maxZoom: ,
    // minZoom: ,
    navigationBarMode: "default",
    navigationBarOrientation: "vertical",
    showBreadcrumb: false,
    showDashboard: true,
    showLocateMeButton: false,
    showMapTypeSelector: true,
    showScalebar: true,
    showTrafficButton: false,
    showTermsLink: true,
    showZoomButtons: true,
    // streetsideOptions: ,
    supportedMapTypes: [
      "aerial",
      "canvasDark",
      "canvasLight",
      "birdseye",
      "grayscale",
      "ordnanceSurvey",
      "road",
      "streetside"
    ]
  });
  function renderOption(option, value) {
    if (option === "navigationBarMode") {
      return (
        <select
          name=""
          id=""
          value={value}
          onChange={ev => setOptions({ ...options, [option]: ev.target.value })}
        >
          <option value="default">Default</option>
          <option value="compact">Compact</option>
          <option value="minified">Minified</option>
          <option value="square">Square</option>
        </select>
      );
    }
    switch (typeof value) {
      case "boolean":
        return (
          <input
            name={option}
            checked={value}
            type="checkbox"
            onChange={() => setOptions({ ...options, [option]: !value })}
          />
        );
      default:
        return <span>{value}</span>;
    }
  }
  return (
    <div className="maps__container">
      <div className="map__controls">
        {Object.keys(options)
          .sort((a, b) =>
            a.toLowerCase() < b.toLowerCase()
              ? -1
              : a.toLowerCase() > b.toLowerCase()
              ? 1
              : 0
          )
          .filter(
            option =>
              option !== "customMapStyle" && option !== "supportedMapTypes"
          )
          .map(option => {
            return (
              <label key={option} htmlFor={option}>
                {option[0].toUpperCase() +
                  option.replace(/([a-z])([A-Z])/g, "$1 $2").substring(1)}
                {renderOption(option, options[option])}
              </label>
            );
          })}
      </div>
      <div key="bingMap" className="map__card">
        <BingMapsReact
          bingMapsKey={process.env.REACT_APP_BINGMAPS_KEY}
          mapOptions={options}
        />
      </div>
    </div>
  );
}

export default App;
