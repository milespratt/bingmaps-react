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
  const [map, setMap] = useState(null);
  const [polygonAdded, setPolygonAdded] = useState(false);

  // https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/geojson-module-examples/read-local-geojson-object-example
  function drawPolygon() {
    if (!polygonAdded) {
      const myGeoJson = {
        coordinates: [
          [
            [-222.6264758, 34.789661],
            [-222.6889734, 34.7861691],
            [-222.6362328, 34.765536],
            [-222.6582792, 34.7179505],
            [-222.6070504, 34.7486121],
            [-222.5641532, 34.7179882],
            [-222.5785546, 34.759613],
            [-222.530398, 34.7860953],
            [-222.595456, 34.7881909],
            [-222.6083834, 34.8318783],
            [-222.6264758, 34.789661],
          ],
        ],
        type: "Polygon",
      };

      //Load the GeoJson Module.
      window.Microsoft.Maps.loadModule("Microsoft.Maps.GeoJson", function () {
        //Parse the GeoJson object into a Bing Maps shape.
        const shape = window.Microsoft.Maps.GeoJson.read(myGeoJson, {
          polygonOptions: {
            fillColor: "#0d8f2b7f",
            strokeColor: "#0d8f2b",
            strokeThickness: 5,
          },
        });

        //Add the shape to the map.
        if (!polygonAdded) {
          map.current.entities.push(shape);
          setPolygonAdded(true);
        }
      });
    }
  }

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
        // onMapReady={({ map }) => {
        //   setMapReady(true);
        //   setMap(map);
        //   drawPolygon();
        // }}
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
