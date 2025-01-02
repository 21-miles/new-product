const fs = require("fs-extra");
const path = require("path");
const appRoot = require("app-root-path");
const logger = require("../config/logger");

class FetchCacheData {
  async loadCacheData(context) {
    const contentDir = path.join(appRoot.path, "brand/.cache");
    const postsDataPath = path.join(contentDir, "allPostsData.json");
    const pagesDataPath = path.join(contentDir, "allPagesData.json");

    if (await fs.pathExists(postsDataPath)) {
      const postsData = await fs.readJson(postsDataPath);
      context.postsData = postsData;
      logger.info(
        `✅ - Dados de posts carregados com sucesso de ${postsDataPath}`
      );
    } else {
      logger.warn(
        `⚠️ - Arquivo allPostsData.json não encontrado em ${postsDataPath}`
      );
    }

    if (await fs.pathExists(pagesDataPath)) {
      const pagesData = await fs.readJson(pagesDataPath);
      context.pagesData = pagesData;
      logger.info(
        `✅ - Dados de páginas carregados com sucesso de ${pagesDataPath}`
      );
    } else {
      logger.warn(
        `⚠️ - Arquivo allPagesData.json não encontrado em ${pagesDataPath}`
      );
    }
  }
}

module.exports = FetchCacheData;
