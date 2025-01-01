import { schedule } from "node-cron";
const { exec } = require("child_process");

/**
 * Schedules a job using CRON or GitHub workflows.
 *
 * @param {string} cronExpression - The CRON expression for scheduling.
 * @param {Function} job - The job function to execute.
 * @param {boolean} [useGitHubWorkflow=false] - Whether to use GitHub workflows for scheduling.
 */
export function scheduleJob(cronExpression, job, useGitHubWorkflow = false) {
  if (useGitHubWorkflow) {
    const workflowCommand = `echo "${cronExpression} /usr/bin/node ${__dirname}/path/to/job.js" | crontab -`;
    exec(workflowCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Error scheduling job with GitHub workflow: ${error.message}`
        );
        return;
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
      }
      console.log(`Job scheduled with GitHub workflow: ${stdout}`);
    });
  } else {
    schedule(cronExpression, async () => {
      try {
        await job();
      } catch (error) {
        console.error("Job failed:", error);
      }
    });
  }
}
