module.exports = {
  presets: [
    ["react-app", { typescript: true }],
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
