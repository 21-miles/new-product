const writeAdminConfigs = require("../lib/decap");
const writeAdsTxt = require("../lib/adsTxt");
const writeStylesScss = require("../lib/sass");
const writeRobotsTxt = require("../lib/robots");

class FileHandler {
  async setupEssentialFiles(config, context) {
    const {
      postsDatas,
      pagesDatas,
      siteUrl,
      adsClientID,
      cloudName,
      cloudApiKey,
      markLogo,
      gitRepo,
      nextVersion,
      version,
      publicSourceFolder,
      stylesFolder,
      theme,
    } = context;

    if (config?.decapCMS) {
      await writeAdminConfigs(
        gitRepo,
        siteUrl,
        cloudName,
        cloudApiKey,
        markLogo,
        nextVersion,
        version,
        publicSourceFolder
      );
    }

    if (config?.scss) {
      await writeStylesScss(theme, stylesFolder);
    }

    if (config?.adsTxt) {
      await writeAdsTxt(adsClientID.split("ca-pub-"), publicSourceFolder);
    }

    if (config?.robotsTxt) {
      await writeRobotsTxt(postsDatas, pagesDatas, siteUrl, publicSourceFolder);
    }
  }
}

module.exports = FileHandler;
