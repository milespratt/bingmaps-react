import React from "react";
import BingMapsReact from "./components/BingMapsReact";

function App() {
  return (
    <div className="map__container">
      <BingMapsReact bingMapsKey={process.env.REACT_APP_BINGMAPS_KEY} />
    </div>
  );
}

export default App;
