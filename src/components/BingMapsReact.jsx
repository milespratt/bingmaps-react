// DEPENDENCIES
import React, { useEffect, useRef, useCallback } from "react";

export default function BingMapsReact({
  bingMapsKey,
  mapOptions,
  height,
  pushPins,
  pushPinsWithInfoboxes,
  viewOptions,
  width
}) {
  const scriptLoadInterval = useRef(null);
  const mapContainer = useRef(null);

  function addPushpinsWithInfoboxes(pushPinsToAdd, infobox, map, Maps) {
    pushPinsToAdd.forEach(pushPin => {
      const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
      newPin.metadata = pushPin.metadata;

      Maps.Events.addHandler(newPin, "mouseover", e => {
        infobox.setOptions({
          location: e.target.getLocation(),
          title: e.target.metadata.title,
          description: e.target.metadata.description,
          visible: true,
          htmlContent: pushPin.infoboxHtml
        });
      });
      Maps.Events.addHandler(newPin, "mouseout", e => {
        infobox.setOptions({
          visible: false
        });
      });
      map.entities.push(newPin);
    });
  }

  function addPushpins(pushPinsToAdd, map, Maps) {
    pushPinsToAdd.forEach(pushPin => {
      const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
      map.entities.push(newPin);
    });
  }

  function setMapViewOptions(map, viewOptions, Maps) {
    const options = { ...viewOptions };
    console.log(viewOptions.mapTypeId);
    if (viewOptions.mapTypeId) {
      options.mapTypeId = Maps.MapTypeId[viewOptions.mapTypeId];
    }
    map.setView(options);
  }

  function setMapOptions(map, mapOptions, Maps) {
    const options = { ...mapOptions };
    if (mapOptions.navigationBarMode) {
      options.navigationBarMode =
        Maps.NavigationBarMode[mapOptions.navigationBarMode];
    }
    if (mapOptions.navigationBarOrientation) {
      options.navigationBarOrientation =
        Maps.NavigationBarOrientation[mapOptions.navigationBarOrientation];
    }
    if (mapOptions.supportedMapTypes) {
      options.supportedMapTypes = mapOptions.supportedMapTypes.map(
        type => Maps.MapTypeId[type]
      );
    }
    map.setOptions(options);
  }

  const makeMap = useCallback(() => {
    const { Maps } = window.Microsoft;

    const newMap = new Maps.Map(mapContainer.current);
    if (viewOptions) {
      setMapViewOptions(newMap, viewOptions, Maps);
    }
    if (mapOptions) {
      setMapOptions(newMap, mapOptions, Maps);
    }

    // PUSH PINS
    if (pushPins) {
      addPushpins(pushPins, newMap, Maps);
    }

    // PUSH PINS WITH INFO BOXES
    if (pushPinsWithInfoboxes) {
      const infobox = new Maps.Infobox(newMap.getCenter(), {
        visible: false
      });
      infobox.setMap(newMap);
      addPushpinsWithInfoboxes(pushPinsWithInfoboxes, infobox, newMap, Maps);
    }
  }, [mapOptions, viewOptions, pushPins, pushPinsWithInfoboxes]);

  const appendBingMapsScript = useCallback(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = `https://www.bing.com/api/maps/mapcontrol?key=${bingMapsKey}`;
    document.body.appendChild(scriptTag);
  }, [bingMapsKey]);

  const initMap = useCallback(() => {
    if (window.Microsoft && window.Microsoft.Maps) {
      makeMap();
    } else {
      appendBingMapsScript();
      scriptLoadInterval.current = window.setInterval(() => {
        if (window.Microsoft && window.Microsoft.Maps) {
          window.clearInterval(scriptLoadInterval.current);
          makeMap();
        }
      }, 500);
    }
  }, [appendBingMapsScript, makeMap]);

  useEffect(() => {
    initMap();
    return () => {
      window.clearInterval(scriptLoadInterval.current);
    };
  }, [bingMapsKey, initMap]);

  return (
    <div ref={mapContainer} style={{ height: height, width: width }}></div>
  );
}
BingMapsReact.defaultProps = {
  bingMapsKey: null,
  mapOptions: null,
  height: "100%",
  pushPins: null,
  pushPinsWithInfoboxes: null,
  viewOptions: null,
  width: "100%"
};
