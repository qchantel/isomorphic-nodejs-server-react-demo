require("ignore-styles");
require("core-js/stable");
require("regenerator-runtime/runtime");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("./server");
