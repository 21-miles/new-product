const fs = require("fs-extra");
const rootFolder = require("app-root-path");
const path = require("path");

async function cleanCoreFolders(devMode) {
  console.log("devMode2:", devMode);

  const coreDestinationFolder = path.join(`${rootFolder}`, `core`);
  const nextDestinationFolder = path.join(`${rootFolder}`, `blog`);

  try {
    // Remove pasta 'core'
    if (fs.existsSync(coreDestinationFolder)) {
      fs.removeSync(coreDestinationFolder);
      console.log("✔️ [Clean Core Folder]: removed successfully.");
    } else {
      console.log("⚠️ [Clean Core Folder]: folder not found, skipping.");
    }

    // Remove pasta 'blog'
    if (fs.existsSync(nextDestinationFolder)) {
      fs.removeSync(nextDestinationFolder);
      console.log("✔️ [Clean NextJS AI Times Folder]: removed successfully.");
    } else {
      console.log(
        "⚠️ [Clean NextJS AI Times Folder]: folder not found, skipping."
      );
    }
  } catch (error) {
    console.error("❌ [Clean Folders]: remove ERROR.");
    console.error("Erro nos detalhes:", error);
  }
}

module.exports = {
  cleanCoreFolders,
};
