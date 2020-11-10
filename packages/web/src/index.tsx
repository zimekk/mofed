import React, { Suspense, lazy } from "react";
import { render } from "react-dom";

// @ts-ignore
const App = lazy(() => import("@mofed/app"));

const Spinner = () => <span>Loading...</span>;

render(
  <Suspense fallback={<Spinner />}>
    <App />
  </Suspense>,
  document.body.appendChild(document.createElement("div"))
);
