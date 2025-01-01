const logger = require("../config/logger");

class BaseTask {
  constructor(configs = {}, apiKeys) {
    this.configs = configs;
    this.apiKeys = apiKeys;
    this.retries = configs.retries || 3;
    this.beforeHook = configs.beforeHook || (() => {});
    this.afterHook = configs.afterHook || (() => {});
  }

  async initialize() {
    logger.info("Initializing task...");
    // Initialization logic here
  }

  async execute(payload) {
    await this.beforeHook(payload);
    let attempts = 0;
    while (attempts < this.retries) {
      try {
        await this.beforeExecute();
        logger.info("Executing task...");
        await this.run(payload);
        await this.afterExecute();
        await this.afterHook(payload);
        break;
      } catch (error) {
        attempts++;
        if (attempts >= this.retries) {
          this.onError(error);
          throw error;
        }
      }
    }
  }

  async run(payload) {
    throw new Error("Method 'run' must be implemented.");
  }

  async beforeExecute() {
    logger.info("Before execution...");
  }

  async afterExecute() {
    logger.info("After execution...");
  }

  onError(error) {
    if (error.critical) {
      logger.error("Critical error during task execution:", error);
      process.exit(1);
    } else {
      logger.warn("Non-critical error:", error);
    }
  }

  logExecution(level, message) {
    switch (level) {
      case "info":
        logger.info(message);
        break;
      case "error":
        logger.error(message);
        break;
      case "debug":
        logger.debug(message);
        break;
      default:
        logger.info(message);
    }
  }
}

module.exports = BaseTask;
