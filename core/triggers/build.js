const DigestPipeline = require("../main");

// Execute the main function to start the build process
const pipeline = new DigestPipeline(
  {
    staticFiles: {
      indexSitemap: true,
      postSitemap: true,
      pageSitemap: true,
      feedsSitemaps: true,
      atom: true,
      rss: true,
      ampStories: true,
    },
    finalPipe: { syncPublicFolder: true },
  },
  {},
  {},
  false,
  false
);

pipeline.run().catch((error) => {
  console.error("❌ - Erro durante a execução do pipeline:", error);
  process.exit(1);
});
