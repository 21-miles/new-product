const fs = require("fs-extra");
const rootFolder = require("app-root-path");
const path = require("path");

async function cleanCoreFolders(devMode) {
  console.log("devMode:", devMode);

  const backendFolder = path.join(`${rootFolder}`, `backend`);
  const frontendFolder = path.join(`${rootFolder}`, `frontend`);

  try {
    // Remove pasta 'backend'
    if (fs.existsSync(backendFolder)) {
      fs.removeSync(backendFolder);
      console.log("✔️ [Clean Backend Folder]: removed successfully.");
    } else {
      console.log("⚠️ [Clean Backend Folder]: folder not found, skipping.");
    }

    // Remove pasta 'frontend'
    if (fs.existsSync(frontendFolder)) {
      fs.removeSync(frontendFolder);
      console.log("✔️ [Clean Frontend Folder]: removed successfully.");
    } else {
      console.log("⚠️ [Clean Frontend Folder]: folder not found, skipping.");
    }
  } catch (error) {
    console.error("❌ [Clean Folders]: remove ERROR.");
    console.error("Erro nos detalhes:", error);
  }
}

module.exports = {
  cleanCoreFolders,
};
