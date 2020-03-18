// default
export const defaultMapOptions = {
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
};
