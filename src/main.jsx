import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Minimal error overlay to surface runtime errors (temporary for debugging)
function showOverlay(message) {
  let el = document.getElementById("__error_overlay__");
  if (!el) {
    el = document.createElement("div");
    el.id = "__error_overlay__";
    Object.assign(el.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(0,0,0,0.85)",
      color: "white",
      padding: "20px",
      zIndex: 99999,
      overflow: "auto",
      fontFamily: "monospace",
      fontSize: "14px",
    });
    document.body.appendChild(el);
  }
  el.textContent = message;
}

window.addEventListener("error", (ev) => {
  showOverlay(
    "Error: " + (ev?.error?.message || ev.message || "Unknown runtime error")
  );
  // also log to console
  console.error(ev.error || ev.message || ev);
});

window.addEventListener("unhandledrejection", (ev) => {
  showOverlay(
    "Unhandled Rejection: " + (ev?.reason?.message || String(ev.reason))
  );
  console.error(ev.reason || ev);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
