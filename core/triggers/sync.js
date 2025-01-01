const DigestPipeline = require("../main");

// Execute the sync step to start the synchronization process
const pipeline = new DigestPipeline(
  {
    syncBuild: true, // Adicione a configuração para sincronização
  },
  {},
  {},
  false,
  false
);
pipeline.run();
