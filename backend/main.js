// Sync Pipe Build PreDev/PreBuild Class
const BasePipeline = require("./classes/BasePipeline");
const PromptProcessor = require("./classes/PromptProcessor");
const StaticFileGenerator = require("./classes/StaticFilesGenerator");
const FinalPipeline = require("./classes/FinalPipeline");
const ExportOutput = require("./classes/ExportOutput");
const SyncPipeline = require("./classes/SyncPipeline");
const FetchCacheData = require("./classes/FetchCacheData");
const StreamCacheData = require("./classes/StreamCacheData"); // Certificar-se de que a importação está correta
const mainProps = require("./config");
const logger = require("./config/logger");

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
    const startTime = Date.now();
    try {
      const context = this.createContext();
      const syncPipeline = new SyncPipeline(this.configs); // Certificar-se de que a instância está correta
      const promptProcessor = new PromptProcessor();
      const staticGenerator = new StaticFileGenerator();
      const finalPipeline = new FinalPipeline();
      const exportOut = new ExportOutput();
      const fetchCacheData = new FetchCacheData();
      let streamCacheData;

      logger.info(
        `Valor de this.configs.streamCache: ${this.configs.streamCache}`
      );
      if (this.configs.streamCache) {
        logger.info("Inicializando StreamCacheData...");
        streamCacheData = new StreamCacheData(this.configs); // Inicializar StreamCacheData se configurado
        logger.info("StreamCacheData inicializado com sucesso.");
      }

      logger.info(
        `🔄 - Configuração 'syncBuild' está ${this.configs.syncBuild ? "ativada" : "desativada"}.`
      );
      if (this.configs.syncBuild) {
        await syncPipeline.syncMarkdownToJson();
        logger.info(
          "✅ - Sincronização concluída! Continuando para as próximas etapas..."
        );
      }

      await staticGenerator.generateStaticFilesIfNeeded(context);
      logger.info("✅ - Arquivos estáticos gerados, continuando o pipeline...");

      if (this.configs.promptDigestion) {
        logger.info("🚀 - Iniciando o processamento dos prompts...");
        await promptProcessor.processPrompts(context);
        logger.info("✅ - Processamento de prompts concluído!");
      }

      await staticGenerator.generateStaticFilesIfNeeded(context);
      logger.info(
        "✅ - Arquivos estáticos gerados novamente, continuando o pipeline..."
      );

      logger.info("🚀 - Executando a etapa final do pipeline...");
      await finalPipeline.runFinalSteps(this.configs.finalPipe, context);
      logger.info("✅ - Etapa final concluída!");

      if (this.configs.exportOutput?.enabled) {
        logger.info("🚀 - Exportando o output final...");
        await exportOut.runExportOutput(this.devMode);
        logger.info("✅ - Exportação do output final concluída!");
      }

      // Fetch data from content/.cache
      logger.info("🚀 - Carregando dados de cache...");
      await fetchCacheData.loadCacheData(context);
      logger.info("✅ - Dados de cache carregados com sucesso!");

      // Start streaming cache data if configured
      logger.info(`Valor de streamCacheData: ${streamCacheData}`);
      if (streamCacheData) {
        logger.info("🚀 - Chamando runStreamCache...");
        try {
          await streamCacheData.runStreamCache(context);
          logger.info("✅ - runStreamCache executado com sucesso!");
        } catch (err) {
          logger.error(`❌ - Erro em runStreamCache: ${err.message}`);
        }

        logger.info("🚀 - runStreamCache foi chamado.");
      } else {
        logger.warn("streamCacheData não foi inicializado.");
      }

      const endTime = Date.now();
      logger.info(
        `🚀 - Pipeline concluído com sucesso em ${(endTime - startTime) / 1000}s!`
      );
    } catch (error) {
      logger.error("❌ - Erro durante a execução do pipeline:", error);
      throw new Error(`Pipeline falhou: ${error.message}`);
    }
  }
}

module.exports = DigestPipeline;
