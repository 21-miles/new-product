// SyncPipeline.js
// Core Name: Milton's Core
// Repo URI: https://github.com/Edu4Dev/digest-it
// Description: Classe de sincronização (PreSync) do pipeline principal
// Author: Milton Bolonha

const fs = require("fs-extra");
const path = require("path");
const rootFolder = require("app-root-path");
const logger = require("../config/logger");
const taxonomy = require("../../content/settings/taxonomy.json"); // Import taxonomy
const MarkdownProcessor = require("./MarkdownProcessor");
const JsonWriter = require("./JsonWriter");
const TemplateVerifier = require("./TemplateVerifier");

class SyncPipeline {
  constructor(config, contentFolder = rootFolder + `/content`) {
    this.config = config;
    this.contentFolder = contentFolder;
    this.folders = this.initializeFolders();
    this.markdownProcessor = new MarkdownProcessor();
    this.jsonWriter = new JsonWriter(this.contentFolder);
    this.templateVerifier = new TemplateVerifier();
  }

  initializeFolders() {
    const folders = [];
    if (this.config.processPages) {
      folders.push({
        path: path.join(this.contentFolder, "pages"),
        type: "pages",
      });
    }
    if (this.config.processPosts) {
      folders.push({
        path: path.join(this.contentFolder, "posts"),
        type: "posts",
      });
    }

    if (this.config.processPrompt) {
      folders.push({
        path: path.join(this.contentFolder, "ai_drafts"),
        type: "ai_drafts",
      });
    }

    if (this.config.processAiAuthors) {
      folders.push({
        path: path.join(this.contentFolder, "ai_authors"),
        type: "ai_authors",
      });
    }
    if (this.config.customFolders) {
      this.config.customFolders.forEach((folder) => {
        folders.push({
          path: path.join(this.contentFolder, folder),
          type: folder,
        });
      });
    }
    return folders;
  }

  async runSyncStep() {
    const files = [];

    try {
      for (const folder of this.folders) {
        logger.info(`Processing folder: ${folder.path}`);
        if (fs.existsSync(folder.path)) {
          for (const file of this.markdownProcessor.readMDFiles(
            folder.path,
            folder.type
          )) {
            files.push(file);
          }
        } else {
          logger.warn(`Folder does not exist: ${folder.path}`);
        }
      }
    } catch (error) {
      logger.error("Error reading files:", error);
      throw new Error("File reading failed");
    }

    logger.info(`Total files processed: ${files.length}`);

    const dataOrdered = files.sort((a, b) =>
      new Date(a.date) > new Date(b.date) ? -1 : 1
    );

    const groupedData = this.folders.reduce((acc, folder) => {
      acc[folder.type] = dataOrdered.filter(
        (file) => file.parentFolder === path.basename(folder.path)
      );
      return acc;
    }, {});

    for (const [type, data] of Object.entries(groupedData)) {
      if (data.length > 0) {
        const jsonData = JSON.stringify({ [type]: data });
        const fileName = `all${
          type.charAt(0).toUpperCase() + type.slice(1)
        }Data.json`;
        logger.info(`Writing JSON file: ${fileName}`);
        this.jsonWriter.writeJson(fileName, jsonData, `${type} MD to JSON`);
      }
    }

    // Verificar e criar templates personalizados
    this.templateVerifier.verifyAndCreateCustomTemplates();
    logger.info("✅ - runSyncStep: Execution continued after synchronization!");
  }

  async syncMarkdownToJson() {
    logger.info(
      "🚀 - Iniciando a sincronização de arquivos Markdown para JSON..."
    );
    await this.runSyncStep();
    logger.info("✅ - runSyncStep: Sincronização concluída!");
  }
}

module.exports = SyncPipeline;
