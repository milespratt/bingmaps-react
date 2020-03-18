import React, { useState, useRef } from "react";
import BingMapsReact from "./components/BingMapsReact";
// import svgMarker from "./assets/marker.svg";
// import pngMarker from "./assets/marker.png";
import logo from "./assets/logo.png";

import { defaultMapOptions } from "./config";

function App() {
  const textArea = useRef(null);
  // const [viewOptions, setViewOptions] = useState({ mapTypeId: "grayscale" });
  const viewOptions = null;
  const [mapOptions, setMapOptions] = useState({
    allowHidingLabelsOfRoad: false,
    allowInfoboxOverflow: false,
    // backgroundColor: "#EAE8E1",
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
    showZoomButtons: true
    // streetsideOptions: ,
    // supportedMapTypes: [
    //   "aerial",
    //   "canvasDark",
    //   "canvasLight",
    //   "birdseye",
    //   "grayscale",
    //   "road",
    //   "streetside"
    // ]
  });
  function renderOption(option, value) {
    if (option === "navigationBarMode") {
      return (
        <select
          name=""
          id=""
          value={value}
          onChange={ev =>
            setMapOptions({ ...mapOptions, [option]: ev.target.value })
          }
        >
          <option value="default">Default</option>
          <option value="compact">Compact</option>
          <option value="minified">Minified</option>
          <option value="square">Square</option>
        </select>
      );
    }
    if (option === "navigationBarOrientation") {
      return (
        <select
          name=""
          id=""
          value={value}
          onChange={ev =>
            setMapOptions({ ...mapOptions, [option]: ev.target.value })
          }
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
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
            onChange={() => setMapOptions({ ...mapOptions, [option]: !value })}
          />
        );
      default:
        return <span>{value}</span>;
    }
  }
  return (
    <div className="maps__container">
      <header>
        <div>
          <h1 style={{ marginTop: 0 }}>Bing Maps - React</h1>
          <p>An easy to use Bing Maps component for React apps.</p>
          <a href="https://github.com/milespratt/bingmaps-react">
            Source/Documentation
          </a>
        </div>
        <img style={{ height: "80%", maxHeight: "100px" }} src={logo} alt="" />
      </header>
      <div className="map__controls">
        {Object.keys(mapOptions)
          .sort((a, b) =>
            a.toLowerCase() < b.toLowerCase()
              ? -1
              : a.toLowerCase() > b.toLowerCase()
              ? 1
              : 0
          )
          .filter(option => option !== "customMapStyle")
          .map(option => {
            return (
              <label key={option} htmlFor={option}>
                {option[0].toUpperCase() +
                  option.replace(/([a-z])([A-Z])/g, "$1 $2").substring(1)}
                {renderOption(option, mapOptions[option])}
              </label>
            );
          })}
      </div>
      <div key="bingMap" className="map__card">
        <BingMapsReact
          bingMapsKey={process.env.REACT_APP_BINGMAPS_KEY}
          mapOptions={mapOptions}
          viewOptions={viewOptions}
          // pushPins={[
          //   {
          //     center: {
          //       latitude: 42.35933,
          //       longitude: -71.19325
          //     },
          //     options: {
          //       icon: svgMarker,
          //       enableHoverStyle: true,
          //       title: "Pushpin",
          //       subTitle: "Without Infobox"
          //     }
          //   }
          // ]}
          // pushPinsWithInfoboxes={[
          //   {
          //     center: {
          //       latitude: 42.35933,
          //       longitude: -71.19325
          //     },
          //     options: {
          //       // icon: svgMarker,
          //       enableHoverStyle: true,
          //       title: "Pushpin",
          //       subTitle: "With Infobox"
          //     },
          //     // infoboxHtml:
          //     //   "<div style='background: white; border-radius: 5px; padding: 5px'>hey there</div>",
          //     metadata: { title: "infobox", description: "description" }
          //   }
          // ]}
        />
      </div>
      <div className="map__config">
        {/* <button className="map__config__button">View Map Options</button> */}
        <button
          className="map__config__button"
          onClick={() => {
            navigator.clipboard.writeText(textArea.current.value);
          }}
        >
          Copy Options to Clipboard
        </button>
        <button
          className="map__config__button"
          onClick={() => setMapOptions(defaultMapOptions)}
        >
          Reset to Defaults
        </button>
      </div>
      <textarea
        ref={textArea}
        style={{ display: "none" }}
        value={JSON.stringify(mapOptions)}
        readOnly
      ></textarea>
    </div>
  );
}

export default App;
