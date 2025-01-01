const DigestPipeline = require("../main");
// Execute the main function to start the build process
const pipeline = new DigestPipeline(
  {
    exportOutput: { enabled: true }, // Ativando a exportação de saída
  },
  {},
  {},
  false,
  false,
  true
);
pipeline.run();
