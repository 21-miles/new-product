const {
  schedulingPosts,
  generateGPTWorkFlow,
} = require("../lib/schedule-post");
const { syncPublicFiles } = require("../lib/syncPublic");
const executeStep = require("../utils/execute-step");

class FinalPipeline {
  async runFinalSteps(config, context) {
    if (config.schedulingPosts) {
      await executeStep("📝 - Write: Schedule Files", schedulingPosts, [
        context.scheduledPosts,
      ]);
    }

    if (config.generateGPTWorkFlow) {
      await executeStep("📝 - Write: Schedule Files", generateGPTWorkFlow, [
        context.workflowsDir,
        context.autoPostData,
      ]);
    }

    if (config.syncPublicFolder) {
      await executeStep("🔄 - Copy: Public Folder", syncPublicFiles, [
        context.publicSourceFolder,
        context.destinationSourceFolder,
      ]);
    }
  }
}

module.exports = FinalPipeline;
