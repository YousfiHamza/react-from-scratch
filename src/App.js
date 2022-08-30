import React from "react";
import { render } from "react-dom";

import Pet from "./Pet";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt me Heading !"),
    React.createElement(Pet, {
      name: "Luna",
      animal: "Dog",
      breed: "Havanese",
    }),
    React.createElement(Pet, {
      name: "Pepper",
      animal: "Bird",
      breed: "Cockateil",
    }),
    React.createElement(Pet, {
      name: "Doink",
      animal: "Cat",
      breed: "mix",
    }),
  ]);
};

render(React.createElement(App), document.getElementById("root"));
