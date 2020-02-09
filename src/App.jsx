import React, { useState } from "react";
import BingMapsReact from "./components/BingMapsReact";

function App() {
  const [options, setOptions] = useState({
    customMapStyle: undefined,
    disableBirdseye: false, // boolean
    disableMapTypeSelectorMouseOver: false, // boolean
    disableStreetside: false, // boolean
    navigationBarMode: "default", // default, compact, minified
    showDashboard: true,
    showMapTypeSelector: true, // boolean
    showScalebar: true, // boolean
    showTermsLink: true // boolean
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
        </select>
      );
    }
    switch (typeof value) {
      case "boolean":
        return (
          <input
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
          .filter(option => option !== "customMapStyle")
          .map(option => {
            return (
              <label key={option} htmlFor="option">
                {option[0].toUpperCase() +
                  option.replace(/([a-z])([A-Z])/g, "$1 $2").substring(1)}
                {renderOption(option, options[option])}
              </label>
            );
          })}
      </div>
      <div key="bingMap" className="map__card">
        <BingMapsReact
          {...options}
          bingMapsKey={process.env.REACT_APP_BINGMAPS_KEY}
        />
      </div>
    </div>
  );
}

export default App;
