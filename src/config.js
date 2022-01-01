export const defaultMapOptions = {
  allowHidingLabelsOfRoad: false, // This property can only be set when using the Map constructor.
  allowInfoboxOverflow: false,
  backgroundColor: "#2b2b2b", // This property can only be set when using the Map constructor.
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
  disableBirdseye: false, // This property can only be set when using the Map constructor.
  disableKeyboardInput: false,
  disableMapTypeSelectorMouseOver: false,
  disablePanning: false,
  disableScrollWheelZoom: false,
  disableStreetside: false, // This property can only be set when using the Map constructor.
  disableStreetsideAutoCoverage: false, // This property can only be set when using the Map constructor.
  disableZooming: false,
  enableClickableLogo: true, // This property can only be set when using the Map constructor.
  enableCORS: false, // This property can only be set when using the Map constructor.
  enableHighDpi: false, // This property can only be set when using the Map constructor.
  enableInertia: true, // This property can only be set when using the Map constructor.
  liteMode: false, // This property can only be set when using the Map constructor.
  // maxBounds: ,
  // maxZoom: ,
  // minZoom: ,
  navigationBarMode: "default",
  navigationBarOrientation: "vertical",
  showBreadcrumb: false,
  showDashboard: true, // This property can only be set when using the Map constructor.
  showLocateMeButton: false, // This property can only be set when using the Map constructor.
  showMapTypeSelector: true, // This property can only be set when using the Map constructor.
  showScalebar: true, // This property can only be set when using the Map constructor.
  showTrafficButton: false,
  showTermsLink: true, // This property can only be set when using the Map constructor.
  showZoomButtons: true, // This property can only be set when using the Map constructor.
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
};

export const defaultViewOptions = {
  // bounds:
  // center: { latitude: 42.360081, longitude: -71.058884 },
  // centerOffset:
  // heading:
  // labelOverlay: false
  hideRoadLabels: true,
  // mapTypeId: "grayscale"
  // padding:
  // pitch:
  // zoom:
};
