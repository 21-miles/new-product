const { syncCoreFolders } = require("../lib/syncCore");
const { syncExportFiles } = require("../lib/syncExport");
const { cleanExportFiles } = require("../lib/cleanExport");
const executeStep = require("../utils/execute-step");

class ExportOutput {
  async runExportOutput(devMode) {
    console.log("Iniciando exportação...");
    console.log("devMode:", devMode);
    await executeStep("🔄 - Sync: Core Folders", syncCoreFolders, []);
    await executeStep("🔄 - Export: Output Folder", syncExportFiles, []);
    console.log("Exportação concluída com sucesso.");
    console.log("Limpando exportação...");
    await executeStep("🔄 - Export: Output Folder", cleanExportFiles, []);
    console.log("Limpeza concluída com sucesso.");
  }
}

module.exports = ExportOutput;
