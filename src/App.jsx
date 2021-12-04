import React, { useState, useEffect } from "react";
import BingMapsReact from "./components/BingMapsReact";
import EatDrinkIcon from "./assets/EatDrink.svg";
import SeeDoIcon from "./assets/SeeDo.svg";

import ShopIcon from "./assets/SeeDo.svg";
import BankIcon from "./assets/Bank.svg";
import HospitalIcon from "./assets/Hospital.svg";
import HotelIcon from "./assets/Hotel.svg";
import ParkingIcon from "./assets/Parking.svg";

const types = [
  { string: "EatDrink", icon: EatDrinkIcon },
  { string: "SeeDo", icon: SeeDoIcon },
  { string: "Shop", icon: ShopIcon },
  { string: "BanksAndCreditUnions", icon: BankIcon },
  { string: "Hospitals", icon: HospitalIcon },
  { string: "HotelsAndMotels", icon: HotelIcon },
  { string: "Parking", icon: ParkingIcon },
];

function App() {
  const [pushPins, setPushPins] = useState([]);
  const [mapReady, setMapReady] = useState(false);

  function addPushPin() {
    Promise.all(
      types.map((type) => {
        return new Promise((resolve, reject) => {
          fetch(
            `https://dev.virtualearth.net/REST/v1/LocalSearch/?type=${type.string}&maxResults=25&key=AlpDpw5UDlAS0ta7sxAWrH6r68v6Lfu-jeoDi1wcKzU6wiUxOxHv2kiCih-mFWcc`
          )
            .then((res) => res.json())
            .then((jsonRes) => {
              const newPins = jsonRes.resourceSets[0].resources.map(
                (resource) => {
                  if (!resource.geocodePoints) {
                    return null;
                  }
                  return {
                    center: {
                      latitude: resource.geocodePoints[0]?.coordinates[0],
                      longitude: resource.geocodePoints[0]?.coordinates[1],
                    },
                    options: {
                      title: resource.name,
                      icon: type.icon,
                    },
                  };
                }
              );
              resolve(newPins);
            });
        });
      })
    ).then((values) => {
      const flattenedValues = [].concat(...values);
      setPushPins(flattenedValues);
    });
  }

  useEffect(() => {
    if (mapReady) {
      addPushPin();
    }
  }, [mapReady]);

  return (
    <div className="map__container">
      <BingMapsReact
        onMapReady={({map}) => {
          setMapReady(true);
        }}
        bingMapsKey={process.env.REACT_APP_BINGMAPS_KEY}
        pushPins={pushPins}
        mapOptions={{
          enableClickableLogo: false,
          navigationBarMode: "square",
          enableHighDpi: true,
        }}
        viewOptions={{
          // center: { latitude: 34.7689, longitude: 137.3917 },
          zoom: 12,
          customMapStyle: {
            elements: {
              area: { fillColor: "#b6e591" },
              water: { fillColor: "#75cff0" },
              tollRoad: { fillColor: "#a964f4", strokeColor: "#a964f4" },
              arterialRoad: { fillColor: "#ffffff", strokeColor: "#d7dae7" },
              road: { fillColor: "#ffa35a", strokeColor: "#ff9c4f" },
              street: { fillColor: "#ffffff", strokeColor: "#ffffff" },
              transit: { fillColor: "#000000" },
            },
            settings: {
              landColor: "#efe9e1",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
