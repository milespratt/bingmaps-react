# Bing Maps - React

![Bing Maps - React][logo]

[logo]: https://github.com/milespratt/bingmaps-react/src/assets/logo.png "Bing Maps - React"

An easy to use Bing Maps component for React apps.

[Demo](https://bingmaps-react.netlify.com)

## Prerequisites

You must have a Bing Maps API key to take full advantage of this component. You can obtain an API key from the [Bing Maps Dev Center](https://www.bingmapsportal.com).

## Installation

`npm install bingmaps-react`

## Usage

Import the BingMapsReact component.

```javascript
import BingMapsReact from "bingmaps-react";
```

Render the component, passing in your bing maps API key

```javascript
<BingMapsReact credentials="YOUR BING MAPS API KEY" />
```

Example:

```javascript
import React from "react";
import BingMapsReact from "bingmaps-react";

function MyReactApp() {
  return (
    <div>
      <BingMapsReact credentials="YOUR BING MAPS API KEY" />
    </div>
  );
}
```

## Available Props

#### Component Specific

| Prop      | Type   | Default     |
| --------- | ------ | ----------- |
| className | string | bing\_\_map |
| id        | string | bing_map_0  |

#### Bing Maps Specific

Each of these props control one of the Bing Maps Map Options. See the [MapOptions Object documentation](https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/mapoptions-object) for more information about each option.

| Prop                            | Type    | Default   |
| ------------------------------- | ------- | --------- |
| credentials                     | string  | undefined |
| customMapStyle                  | string  | undefined |
| disableBirdseye                 | boolean | false     |
| disableMapTypeSelectorMouseOver | boolean | false     |
| disableStreetside               | boolean | false     |
| disableStreetsideAutoCoverage   | boolean | false     |
| enableClickableLogo             | boolean | true      |
| navigationBarMode               | string  | default   |
| showDashboard                   | boolean | true      |
| showMapTypeSelector             | boolean | true      |
| showScalebar                    | boolean | true      |
| showTermsLink                   | boolean | true      |
