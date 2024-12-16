import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Set the initial website title
document.title = "SceneThis";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <App />
  </StrictMode>
);
