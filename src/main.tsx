import { Router } from "@raula/router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { appRouting } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router routes={appRouting} />
  </React.StrictMode>
);
