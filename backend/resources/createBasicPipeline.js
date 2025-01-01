import { BasePipeline } from "../classes/BasePipeline";

export function createBasicPipeline() {
  return new BasePipeline([
    async () => {
      // Step 1: Add your logic here
      console.log("Executing Step 1");
    },
    async () => {
      // Step 2: Add your logic here
      console.log("Executing Step 2");
    },
    async () => {
      // Step 3: Add your logic here
      console.log("Executing Step 3");
    },
  ]);
}
