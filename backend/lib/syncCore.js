const fs = require("fs-extra");
const rootFolder = require("app-root-path");
const path = require("path");

async function syncCoreFolders(devMode) {
  console.log("devMode2:", devMode);

  const nodeFolder = devMode ? `` : `node_modules/digest-it/`;
  const backendFolder = path.join(`${rootFolder}`, `${nodeFolder}backend`);
  const frontendFolder = path.join(`${rootFolder}`, `${nodeFolder}frontend`);
  const backendDestinationFolder = path.join(`${rootFolder}`, `backend`);
  const nextDestinationFolder = path.join(`${rootFolder}`, `frontend`);

  try {
    // Copia pasta 'backend'
    fs.copySync(backendFolder, backendDestinationFolder, { recursive: true });
    console.log("✔️ [Sync Backend Files]: copy successfully.");

    // Copia pasta 'frontend'
    fs.copySync(frontendFolder, nextDestinationFolder, { recursive: true });
    console.log("✔️ [Sync Frontend Files]: copy successfully.");
  } catch (error) {
    console.error("❌ [Sync Files]: copy ERROR.");
    console.error("Erro nos detalhes:", error);
  }
}

module.exports = {
  syncCoreFolders,
};
