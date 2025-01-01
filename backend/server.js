const DigestPipeline = require("./main");

// Executar o trigger de sincronização básica
console.log("Iniciando o pipeline...");
const pipeline = new DigestPipeline(
  {
    syncBuild: true, // Adicione a configuração para sincronização
    streamCache: true, // Adicione a configuração para iniciar o servidor de cache
  },
  {},
  {},
  false,
  false
);

console.log("Pipeline configurado:", pipeline);

pipeline
  .run()
  .then(() => {
    console.log("Pipeline executado com sucesso!");
  })
  .catch((error) => {
    console.error("❌ - Erro durante a execução do pipeline:", error);
    process.exit(1);
  });
