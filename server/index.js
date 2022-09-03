import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";

// import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/frontend/index.html").toString();

const parts = html.split("NOT RENDERED !"); // splitting the html to insert our page there !

const app = express();

app.use("/frontend", express.static("dist/frontend"));

app.use((req, res) => {
  const reactMarkup = <StaticRouter location={req.url}>{/* <App /> */}</StaticRouter>;
  res.send(parts[0] + renderToString(reactMarkup) + parts[1]);
  res.end();
});

app.listen(PORT, () => {
  console.log("listening on Port : ", PORT);
});
