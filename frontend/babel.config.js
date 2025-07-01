// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react", // For react components
    "@babel/preset-typescript", // For TypeScript files
  ],
};
