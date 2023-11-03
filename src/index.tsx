import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./router";

createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
