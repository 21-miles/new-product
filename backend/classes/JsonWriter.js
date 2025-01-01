const fs = require("fs-extra");
const path = require("path");
const logger = require("../config/logger");

class JsonWriter {
  constructor(contentFolder) {
    this.contentFolder = contentFolder;
  }

  writeJson(fileName, data, description) {
    const filePath = path.join(this.contentFolder, ".cache/" + fileName);
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
