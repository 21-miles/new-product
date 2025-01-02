#!/usr/bin/env node
const rootFolder = require("app-root-path");
const brandFolder = rootFolder + `/brand`;
console.log(`${brandFolder}/settings/version`);
require("./backend/main");
