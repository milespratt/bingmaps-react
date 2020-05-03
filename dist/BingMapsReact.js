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
  // refs
  const mapContainer = useRef(null);
  const map = useRef(null); // removes pushpins

  function removePushpins(map, Maps) {
    for (var i = map.entities.getLength() - 1; i >= 0; i--) {
      var pushpin = map.entities.get(i);

      if (pushpin instanceof Maps.Pushpin) {
        map.entities.removeAt(i);
      }
    }
  } // add pushpins with infoboxes


  function addPushpinsWithInfoboxes(pushPinsToAdd, infobox, map, Maps) {
    removePushpins(map, Maps);
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
  } // add pushpins


  function addPushpins(pushPinsToAdd, map, Maps) {
    pushPinsToAdd.forEach(pushPin => {
      const newPin = new Maps.Pushpin(pushPin.center, pushPin.options);
      map.entities.push(newPin);
    });
  } // set view options


  function setMapViewOptions(map, viewOptions, Maps) {
    const options = { ...viewOptions
    };

    if (viewOptions.mapTypeId) {
      options.mapTypeId = Maps.MapTypeId[viewOptions.mapTypeId];
    }

    if (viewOptions.hideRoadLabels) {
      options.labelOverlay = Maps.LabelOverlay.hidden;
    }

    map.setView(options);
  } // set map options


  function setMapOptions(map, mapOptions, Maps) {
    const options = { ...mapOptions
    }; // some map options require values from the Maps class
    // these conditional statements handle those cases

    if (mapOptions.navigationBarMode) {
      options.navigationBarMode = Maps.NavigationBarMode[mapOptions.navigationBarMode];
    }

    if (mapOptions.navigationBarOrientation) {
      options.navigationBarOrientation = Maps.NavigationBarOrientation[mapOptions.navigationBarOrientation];
    }

    if (mapOptions.supportedMapTypes) {
      options.supportedMapTypes = mapOptions.supportedMapTypes.map(type => Maps.MapTypeId[type]);
    }

    map.setOptions(options);
  } // make map, set options, add pins


  const makeMap = useCallback(() => {
    const {
      Maps
    } = window.Microsoft; // only make a new map if one doesnt already exist

    if (!map.current) {
      map.current = new Maps.Map(mapContainer.current);
    } // set viewOptions, if any


    if (viewOptions) {
      setMapViewOptions(map.current, viewOptions, Maps);
    } // set mapOptions, if any


    if (mapOptions) {
      setMapOptions(map.current, mapOptions, Maps);
    } // add push pins, if any


    if (pushPins) {
      addPushpins(pushPins, map.current, Maps);
    } // add infoboxes, if any


    if (pushPinsWithInfoboxes) {
      const infobox = new Maps.Infobox(map.current.getCenter(), {
        visible: false
      });
      infobox.setMap(map.current);
      addPushpinsWithInfoboxes(pushPinsWithInfoboxes, infobox, map.current, Maps);
    }
  }, [mapOptions, viewOptions, pushPins, pushPinsWithInfoboxes]); // attach makeMap to window for the bingmaps sript callback

  window.makeMap = makeMap; // append bingmaps script to body

  const appendBingMapsScript = useCallback(() => {
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("defer", "");
    scriptTag.setAttribute("async", "");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", `https://www.bing.com/api/maps/mapcontrol?key=${bingMapsKey}&callback=makeMap`);
    document.body.appendChild(scriptTag);
  }, [bingMapsKey]); // make a new map if bingmaps classes already exist
  // append the script if not

  const initMap = useCallback(() => {
    if (window.Microsoft && window.Microsoft.Maps) {
      makeMap();
    } else {
      appendBingMapsScript();
    }
  }, [appendBingMapsScript, makeMap]);
  useEffect(() => {
    initMap();
  }, [bingMapsKey, initMap]);
  return React.createElement("div", {
    ref: mapContainer,
    style: {
      height: height,
      width: width
    }
  });
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