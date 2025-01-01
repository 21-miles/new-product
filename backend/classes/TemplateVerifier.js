const fs = require("fs-extra");
const path = require("path");
const rootFolder = require("app-root-path");
const logger = require("../config/logger");
const taxonomy = require("../../content/settings/taxonomy.json"); // Import taxonomy
const baseTemplate = require("../bin/base-template"); // Import base template

class TemplateVerifier {
  constructor() {
    this.templateFolder = path.join(rootFolder.path, "blog/src/templates");
  }

  verifyAndCreateCustomTemplates() {
    // Certifique-se de que o diretório de templates existe
    if (!fs.existsSync(this.templateFolder)) {
      fs.mkdirSync(this.templateFolder, { recursive: true });
    }

    Object.keys(taxonomy).forEach((key) => {
      if (key !== "posts" && key !== "pages") {
        const templatePath = path.join(this.templateFolder, `${key}-page.js`);
        if (!fs.existsSync(templatePath)) {
          logger.warn(
            `Template file not found: ${templatePath}. Creating from base template.`
          );
          fs.writeFileSync(templatePath, baseTemplate);
          logger.info(`Template file created: ${templatePath}`);
        } else {
          logger.info(`Template file verified: ${templatePath}`);
        }
      }
    });
  }
}

module.exports = TemplateVerifier;
