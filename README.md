[![Maintainability](https://api.codeclimate.com/v1/badges/b81f96d501e3f41bf2cc/maintainability)](https://codeclimate.com/github/milespratt/bingmaps-react/maintainability) <a href="https://codeclimate.com/github/milespratt/bingmaps-react/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b81f96d501e3f41bf2cc/test_coverage" /></a>
[![milespratt](https://circleci.com/gh/milespratt/bingmaps-react.svg?style=shield)](LINK)

<img align="right" width="100" height="100" src="https://github.com/milespratt/bingmaps-react/blob/master/src/assets/logo.png?raw=true">

# Bing Maps - React

An easy to use Bing Maps component for React apps. View the [demo](https://bingmaps-react.netlify.com).

<!-- <p align="center"> -->
  <img align="center" width="500" height="500" src="https://github.com/milespratt/bingmaps-react/blob/master/src/assets/screenshot.png?raw=true">
<!-- </p> -->

## Prerequisites

You must have a Bing Maps API key to take full advantage of this component. You can obtain an API key from the [Bing Maps Dev Center](https://www.bingmapsportal.com).

## Installation

`yarn add bingmaps-react`

OR

`npm install bingmaps-react`

## Usage

Import the BingMapsReact component.

```javascript
import BingMapsReact from "bingmaps-react";
```

Render the component, passing in your bing maps API key

```javascript
<BingMapsReact bingMapsKey="your bing maps API key goes here" />
```

Minimal Example:

```javascript
import React from "react";
import BingMapsReact from "bingmaps-react";

function MyReactApp() {
  return <BingMapsReact bingMapsKey="your bing maps API key goes here" />;
}
```

Customized Example:

```javascript
import React from "react";
import BingMapsReact from "bingmaps-react";

function BingMap() {
  return (
    <BingMapsReact
      bingMapsKey="your bing maps API key goes here"
      height="500px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="500px"
      viewOptions={{
        center: { latitude: 42.360081, longitude: -71.058884 },
        mapTypeId: "grayscale",
      }}
    />
  );
}
```

## Props

| Prop                  | Type     | Default | Note                                                                                                                                                                                                                                                 |
| --------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bingMapsKey           | string   | null    | Your bing maps API key                                                                                                                                                                                                                               |
| height                | string   | "100%"  | The map defaults to 100% height of parent element                                                                                                                                                                                                    |
| mapOptions            | object   | null    | A Bing Maps MapOptions Object. See the [MapOptions Object documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/mapoptions-object) for more information about each option.                                         |
| onMapReady            | function | null    | Due to the asynchronous nature of the Bing Maps API you may encounter errors if you change props before the map has finished an initial load. You can pass a function to the onMapReady prop that will only run when the map has finished rendering. |
| pushPins              | array    | null    | An array of pushpin objects. See the [Bing Maps Pushpin documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/pushpins/) for more information.                                                                |
| pushPinsWithInfoboxes | array    | null    | An array of pushpin objects with inbox box options. See the [Bing Maps Infobox documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/) for more information.                                        |
| viewOptions           | object   | null    | A Bing Maps ViewOptions Object. See the [ViewOptions Object documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/viewoptions-object) for more information about each option.                                      |
| width                 | string   | "100%"  | The map defaults to 100% height of parent element                                                                                                                                                                                                    |
