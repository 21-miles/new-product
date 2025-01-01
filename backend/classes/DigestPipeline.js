const BasePipeline = require("./BasePipeline");
const SyncPipeline = require("./SyncPipeline");
const PromptProcessor = require("./PromptProcessor");
const StaticFileGenerator = require("./StaticFilesGenerator");
const FinalPipeline = require("./FinalPipeline");
const ExportOutput = require("./ExportOutput");
const Workflow = require("./Workflow");
const fs = require("fs");
const logger = require("../config/logger");

class DigestPipeline extends BasePipeline {
  constructor(
    userConfigs = {},
    userPaths = {},
    userKeys = {},
    autoPost = false,
    userDebug = false,
    userDevMode = false
  ) {
    const mergedConfigs = { ...mainProps.configs, ...userConfigs };
    super(mergedConfigs, userPaths, userKeys, autoPost, userDebug, userDevMode);
  }

  createContext() {
    return {
      ...this.paths,
      ...this.configs,
      apiKeys: this.apiKeys,
      publicSourceFolder: this.publicSourceFolder,
      destinationSourceFolder: this.destinationSourceFolder,
    };
  }

  async run() {
    const context = this.createContext();
    const syncPipeline = new SyncPipeline(this.configs);
    const promptProcessor = new PromptProcessor();
    const staticGenerator = new StaticFileGenerator();
    const finalPipeline = new FinalPipeline();
    const exportOut = new ExportOutput();

    const tasks = [
      {
        label: "Sync Markdown to JSON",
        task: syncPipeline.runSyncStep.bind(syncPipeline),
        condition: () => this.configs.syncBuild,
      },
      {
        label: "Generate Static Files",
        task: staticGenerator.generateStaticFiles.bind(
          staticGenerator,
          this.configs.staticFiles,
          context
        ),
        condition: () => fs.existsSync(this.paths.publicSourceFolder),
      },
      {
        label: "Process Prompts",
        task: promptProcessor.processPrompts.bind(promptProcessor, context),
        condition: () => this.configs.promptDigestion,
      },
      {
        label: "Final Pipeline Steps",
        task: finalPipeline.runFinalSteps.bind(
          finalPipeline,
          this.configs.finalPipe,
          context
        ),
      },
      {
        label: "Export Output",
        task: exportOut.runExportOutput.bind(exportOut, this.devMode),
        condition: () => this.configs.exportOutput?.enabled,
      },
    ];

    const workflow = new Workflow(tasks.filter((task) => task.condition()));
    await workflow.runSequential(context);
  }
}

module.exports = DigestPipeline;
