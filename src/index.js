import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./assets/css/Grid.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App tab="Eduon" />);