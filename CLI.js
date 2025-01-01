#!/usr/bin/env node
const rootFolder = require("app-root-path");
const contentFolder = rootFolder + `/content`;
console.log(`${contentFolder}/settings/version`);
require("./core/main");
