import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App mode="splash" />,
  },
  {
    path: "/main",
    element: <App mode="content" />,
  },
]);

export default router;
