const DigestPipeline = require("../main");

/**
 * Executes the build pipeline with specific configurations.
 *
 * @type {DigestPipeline}
 * @property {Object} initialPipe - Configuration for the initial pipeline steps.
 * @property {boolean} initialPipe.deleteOldCrons - Whether to delete old cron jobs.
 * @property {boolean} initialPipe.deleteGPTWorkflows - Whether to delete old GPT workflows.
 * @property {boolean} promptDigestion - Enables or disables prompt digestion.
 * @property {Object} staticFiles - Configuration for generating static files.
 * @property {boolean} staticFiles.indexSitemap - Enable or disable the index sitemap generation.
 * @property {boolean} staticFiles.postSitemap - Enable or disable the post sitemap generation.
 * @property {boolean} staticFiles.pageSitemap - Enable or disable the page sitemap generation.
 * @property {boolean} staticFiles.feedsSitemaps - Enable or disable feed sitemaps generation.
 * @property {boolean} staticFiles.atom - Enable or disable Atom feed generation.
 * @property {boolean} staticFiles.rss - Enable or disable RSS feed generation.
 * @property {boolean} staticFiles.ampStories - Enable or disable AMP stories generation.
 * @property {Object} essentialFiles - Configuration for essential files generation.
 * @property {boolean} essentialFiles.decapCMS - Enable or disable DecapCMS files generation.
 * @property {boolean} essentialFiles.scss - Enable or disable SCSS files generation.
 * @property {Object} finalPipe - Configuration for the final pipeline steps.
 * @property {boolean} finalPipe.schedulingPosts - Enable or disable post scheduling.
 * @property {boolean} finalPipe.syncPublicFolder - Enable or disable public folder synchronization.
 * @property {boolean} finalPipe.generateGPTWorkFlow - Enable or disable GPT workflow generation.
 * @property {Object} exportOutput - Configuration for exporting output.
 * @property {boolean} exportOutput.enabled - Enable or disable output export.
 * @property {boolean} processPages - Enable or disable processing of pages.
 * @property {boolean} processPosts - Enable or disable processing of posts.
 * @property {boolean} processPrompt - Enable or disable prompt processing.
 * @property {boolean} processAiAuthors - Enable or disable AI authors processing.
 * @property {string[]} customFolders - List of custom folders to process.
 */
const buildPipeline = new DigestPipeline(
  {
    initialPipe: { deleteOldCrons: false, deleteGPTWorkflows: false },
    promptDigestion: false,
    staticFiles: {
      indexSitemap: false,
      postSitemap: false,
      pageSitemap: false,
      feedsSitemaps: false,
      atom: false,
      rss: false,
      ampStories: false,
    },
    essentialFiles: { decapCMS: false, scss: false },
    finalPipe: {
      schedulingPosts: false,
      syncPublicFolder: false,
      generateGPTWorkFlow: false,
    },
    exportOutput: { enabled: false }, // Ativando a exportação de saída
    processPages: true, // Enable processing of pages
    processPosts: true, // Enable processing of posts
    processPrompt: true, // Enable processing of posts
    processAiAuthors: true, // Enable processing of posts
    customFolders: ["custom"], // Custom folders to process
  },
  {},
  {},
  false,
  false
);

buildPipeline.run().catch((error) => {
  console.error("❌ - Error during build pipeline execution:", error);
  process.exit(1);
});

/**
 * Executes another pipeline with custom configurations.
 */
const anotherPipeline = new DigestPipeline(
  {
    // ...custom configurations for another trigger...
  },
  {},
  {},
  false,
  false
);

anotherPipeline.run().catch((error) => {
  console.error("❌ - Error during another pipeline execution:", error);
  process.exit(1);
});

// Add more triggers as needed with their respective configurations
