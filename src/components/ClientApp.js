import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// import App from "../App"; get it when SSR

hydrateRoot(document.getElementById("root"), <BrowserRouter>{/* <App /> */}</BrowserRouter>);
