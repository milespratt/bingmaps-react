[![Maintainability](https://api.codeclimate.com/v1/badges/b81f96d501e3f41bf2cc/maintainability)](https://codeclimate.com/github/milespratt/bingmaps-react/maintainability) <a href="https://codeclimate.com/github/milespratt/bingmaps-react/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b81f96d501e3f41bf2cc/test_coverage" /></a>
[![milespratt](https://circleci.com/gh/milespratt/bingmaps-react.svg?style=shield)](LINK)

<img align="right" width="100" height="100" src="https://github.com/milespratt/bingmaps-react/blob/master/src/assets/logo.png?raw=true" />


# Bing Maps - React

An easy to use Bing Maps component for React apps. View the demo [here](https://bingmaps-react.netlify.com).

<img align="center" width="500" src="https://github.com/milespratt/bingmaps-react/blob/master/src/assets/example.png?raw=true" />

- [Bing Maps - React](#bing-maps---react)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Props](#props)
  - [Examples](#examples)
    - [Pushpins](#pushpins)

## Prerequisites

You must have a Bing Maps API key to take full advantage of this component. You can obtain an API key from the [Bing Maps Dev Center](https://www.bingmapsportal.com).

## Installation
```
yarn add bingmaps-react
```
OR
```
npm install bingmaps-react
```

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
| height                | string   | "100%"  | The map defaults to 100% height and width of parent element.                                                                                                                                                                                                    |
| mapOptions            | object   | null    | A Bing Maps MapOptions Object. See the [MapOptions Object documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/mapoptions-object) for more information about each option.                                         |
| onMapReady            | function | null    | Due to the asynchronous nature of the Bing Maps API you may encounter errors if you change props before the map has finished an initial load. You can pass a function to the onMapReady prop that will only run when the map has finished rendering. |
| pushPins              | array    | null    | An array of pushpin objects. See the [Bing Maps Pushpin documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/pushpins/) for more information.                                                                |
| pushPinsWithInfoboxes | array    | null    | An array of pushpin objects with infobox options. See the [Bing Maps Infobox documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/infoboxes/) for more information.                                        |
| viewOptions           | object   | null    | A Bing Maps ViewOptions Object. See the [ViewOptions Object documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/viewoptions-object) for more information about each option.                                      |
| width                 | string   | "100%"  | The map defaults to 100% height and width of parent element.                                                                                                                                                                                                    |

## Examples
Please reference the [Bing Maps V8 Web Control documentation ](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/?toc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fbingmaps%2Fv8-web-control%2Ftoc.json&bc=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2FBingMaps%2Fbreadcrumb%2Ftoc.json) for more information about each of the features listed below.
### Pushpins
[Docs](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/pushpins/)

To add Pushpins to the map, pass in an array of pushpin objects to the `pushPins` prop. Each Pushpin object should have the following properties:

- `center`: An object with `latitude` and `longitude` properties.
- `options`: an object with [Pushpin options](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/pushpinoptions-object);

```javascript
...

const pushPin = {
  center: {
    latitude: 27.987850,
    longitude: 86.925026,
  },
  options: {
    title: "Mt. Everest",
  },
}

const pushPins = [pushPin];

return (
  <BingMapsReact
    pushPins={pushPins}
    viewOptions={{ center: { latitude: 27.98785, longitude: 86.925026 } }}
  />
)

...
```
<img  align="center" width="500" src="https://github.com/milespratt/bingmaps-react/blob/master/src/assets/example-pushpin.png?raw=true">
