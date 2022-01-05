import path from "path";
import fs from "fs";
import cors from "cors";
import { fetchUrl } from "../src/api/api";

import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 8080;
const app = express();

const router = express.Router();

const getHostUrl = (req) => {
  return req.protocol + "://" + req.get("host");
};

const formatHTMLResponse = (html, req) => {
  const replaceStaticImports = html.replaceAll(
    "/static",
    `${getHostUrl(req)}/static`
  );
  return replaceStaticImports;
};

const serverRenderer = async (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }
    let __FETCHED_DATA__ = null;

    const response = await fetchUrl("https://www.boredapi.com/api/activity/");
    __FETCHED_DATA__ = response.data;

    const renderedHtml = data.replace(
      '<div id="root"></div>',
      `<div id="root">
    <script>window.__FETCHED_DATA__=${JSON.stringify(__FETCHED_DATA__)}</script>
    ${ReactDOMServer.renderToString(<App payload={__FETCHED_DATA__} />)}</div>`
    );
    const formattedHTMLRes = formatHTMLResponse(renderedHtml, req);
    return res.send(formattedHTMLRes);
  });
};

router.use("^/$", async function (req, res, next) {
  serverRenderer(req, res, next);
});

router.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// tell the app to use the above rules
app.use(cors());
app.use(router);

// app.use(express.static('./build'))
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
