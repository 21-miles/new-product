const BaseTask = require("./BaseTask");

class Workflow {
  constructor(tasks = []) {
    this.tasks = tasks.map((task) => new BaseTask(task));
  }

  async runSequential(payload) {
    for (const task of this.tasks) {
      await task.execute(payload);
    }
  }

  async runParallel(payload) {
    await Promise.all(this.tasks.map((task) => task.execute(payload)));
  }
}

module.exports = Workflow;
