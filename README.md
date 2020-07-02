# Frontend-Util (React)

This repository contains react components representing my design system.

## Setup

Add this repository as a submodule under:
`./src/util/`

### Configuration

Create an .env file in the root folder (./) and add the following lines:

```
REACT_APP_API_URL=XXX
REACT_APP_AJAX_TIMEOUT=XXX in ms
REACT_APP_ROUTER_BASENAME=XXX (in case the app is in a subdirectory, add it here with a leading and NO ending slash)
```

Add the following to the `package.json` file, to make the build webpage also work in a subdirectory:

```json
  "homepage": "./",
```

### Corporate Design

Add the following to App.js:
`import "./util/styles.css";`

### Include Libraries

`yarn add axios`
`yarn add video-react`
`yarn add @fortawesome/fontawesome-free`

Add `<link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/css/all.css" />` to `index.html` in `public`.

## Start

Replace the content of `App.js` with the following:

```javascript
import React from "react";
import "./util/styles.css";
import BasicApp from "./util/base/BasicApp";
import Login, { LoginRoute } from "./util/login/Login";
import Tile from "./util/display/Tile";

const homeRoute = {
  path: "/",
  exact: "true",
  private: "false",
  icon: "\uf015",
  title: "Home",
};
const aboutRoute = {
  path: "/about",
  exact: "true",
  private: "false",
  icon: "\uf2bb",
  title: "About me",
};

function App() {
  return (
    <div>
      <BasicApp enableSearch={false}>
        <div {...homeRoute}>
          <Tile title="Welcome">Welcome to the Home content</Tile>
        </div>
        <div {...aboutRoute}>
          <Tile title="About me">This is displays information about me</Tile>
        </div>
        <Login {...LoginRoute}></Login>
      </BasicApp>
    </div>
  );
}

export default App;
```

You can use the attribute `type="header-element"` to shift an element into the header of the BasicApp.
