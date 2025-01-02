const fs = require("fs-extra");
const path = require("path");
const logger = require("../config/logger");

class JsonWriter {
  constructor(brandFolder) {
    this.brandFolder = brandFolder;
  }

  writeJson(fileName, data, description) {
    const filePath = path.join(this.brandFolder, ".cache/" + fileName);
    try {
      fs.writeFileSync(filePath, data);
      logger.info(`✔️ [${description}] - ${fileName} stored successfully.`);
    } catch (error) {
      logger.error(`❌ [${description}] - ERROR: ${error.message}`);
      throw new Error("File writing failed");
    }
  }
}

module.exports = JsonWriter;
