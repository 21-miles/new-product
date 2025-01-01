const logger = require("../config/logger");

class WorkflowManager {
  constructor(steps = []) {
    this.steps = steps;
    this.state = {};
    this.metrics = {
      totalSteps: steps.length,
      completedSteps: 0,
      failedSteps: 0,
    };
  }

  addStep(step) {
    this.steps.push(step);
    this.metrics.totalSteps++;
  }

  async execute() {
    for (const step of this.steps) {
      if (step.condition && !step.condition(this.state)) {
        continue;
      }

      try {
        logger.info(`Executing step: ${step.label}`);
        await step.fn(this.state);
        logger.info(`Step completed: ${step.label}`);
        this.metrics.completedSteps++;
      } catch (error) {
        logger.error(`Error in step: ${step.label}`, error);
        this.metrics.failedSteps++;
        if (step.rollback) {
          logger.info(`Rolling back step: ${step.label}`);
          await step.rollback(this.state);
        }
        throw error;
      }
    }
  }

  getMetrics() {
    return this.metrics;
  }
}

module.exports = WorkflowManager;
