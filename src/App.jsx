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
  const [mapOptions, setMapOptions] = useState({ ...defaultMapOptions });
  function renderOption(option, value) {
    if (
      option === "navigationBarMode" ||
      option === "navigationBarOrientation"
    ) {
      return (
        <select
          value={value}
          onChange={ev =>
            setMapOptions({ ...mapOptions, [option]: ev.target.value })
          }
        >
          {option === "navigationBarMode" ? (
            <>
              <option value="default">Default</option>
              <option value="compact">Compact</option>
              <option value="minified">Minified</option>
              <option value="square">Square</option>
            </>
          ) : (
            <>
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </>
          )}
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
