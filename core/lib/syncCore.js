const fs = require("fs-extra");
const rootFolder = require("app-root-path");
const path = require("path");

async function syncCoreFolders(devMode) {
  console.log("devMode2:", devMode);

  const nodeFolder = devMode ? `` : `node_modules/digest-it/`;
  const coreSourceFolder = path.join(`${rootFolder}`, `${nodeFolder}core`);
  const nextSourceFolder = path.join(`${rootFolder}`, `${nodeFolder}blog`);
  const coreDestinationFolder = path.join(`${rootFolder}`, `core`);
  const nextDestinationFolder = path.join(`${rootFolder}`, `blog`);

  try {
    // Copia pasta 'core'
    fs.copySync(coreSourceFolder, coreDestinationFolder, { recursive: true });
    console.log("✔️ [Sync Core Files]: copy successfully.");

    // Copia pasta 'blog'
    fs.copySync(nextSourceFolder, nextDestinationFolder, { recursive: true });
    console.log("✔️ [Sync NextJS AI Times Files]: copy successfully.");
  } catch (error) {
    console.error("❌ [Sync Files]: copy ERROR.");
    console.error("Erro nos detalhes:", error);
  }
}

module.exports = {
  syncCoreFolders,
};
