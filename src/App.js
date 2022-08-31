import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import HomePage from "./pages/Home.page";

import "./App.css";

const App = () => (
  <StrictMode>
    <HomePage />
  </StrictMode>
);

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render new API - React 18
root.render(<App />);
