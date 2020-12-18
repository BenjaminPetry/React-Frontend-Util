const path = require("path");

const resources = [
  "02_tools/_mixins.scss"
];

module.exports = resources.map(file => path.resolve(__dirname, file));