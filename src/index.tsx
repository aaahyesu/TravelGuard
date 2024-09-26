import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // HTML 요소로 타입 단언
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
