const path = require("path"); // Não esqueça de importar o módulo `path` se ainda não foi feito
const appRoot = require("app-root-path");
const env = appRoot + `/.env`;

require("dotenv").config({
  path: env,
});

/**
 * Main configuration object for the application.
 *
 * @type {MainProps}
 */

/**
 * @typedef {Object} MainProps
 * @property {Switchers} switchers - Ignite[`true`]: Start pipelines.
 * @property {Paths} paths - Directories and files paths used in the application.
 * @property {ApiKeys} apiKeys - API keys for external services.
 * @property {boolean} autoPost - Toggle[`true`]: enable automatic posting.
 * @property {boolean} debug - Toggle[`true`]: enable debug mode.
 * @property {boolean} devMode - Toggle[`true`]: enable devMode mode.
 * @property {boolean} processPages - Toggle[`true`]: enable processing of pages.
 * @property {boolean} processPosts - Toggle[`true`]: enable processing of posts.
 * @property {Array<string>} customFolders - List of custom folders to process.
 */

/**
 * @typedef {Object} Switchers
 * @property {Object} initialPipe - Ignite[`true`]: initial pipeline processing.
 * @property {boolean} initialPipe.deleteOldCrons - Toggle[`true`]: delete old cron jobs.
 * @property {boolean} promptDigestion - Toggle[`true`]: process prompt digestion.
 * @property {Object} staticFiles - Ignite[`true`]: handling static files.
 * @property {boolean} staticFiles.indexSitemap - Toggle[`true`]: generate an index sitemap.
 * @property {boolean} staticFiles.postSitemap - Toggle[`true`]: generate a post sitemap.
 * @property {boolean} staticFiles.pageSitemap - Toggle[`true`]: generate a page sitemap.
 * @property {boolean} staticFiles.feedsSitemaps - Toggle[`true`]: generate feed sitemaps.
 * @property {boolean} staticFiles.atom - Toggle[`true`]: generate an Atom feed.
 * @property {boolean} staticFiles.rss - Toggle[`true`]: generate an RSS feed.
 * @property {boolean} staticFiles.ampStories - Toggle[`true`]: generate AMP stories.
 * @property {Object} essentialFiles - Ignite[`true`]: handling essential files.
 * @property {boolean} essentialFiles.decapCMS - Toggle[`true`]: include DecapCMS.
 * @property {boolean} essentialFiles.scss - Toggle[`true`]: include SCSS files.
 * @property {Object} finalPipe - Ignite[`true`]: final pipeline processing.
 * @property {boolean} finalPipe.schedulingPosts - Toggle[`true`]: schedule posts.
 * @property {boolean} finalPipe.syncPublicFolder - Toggle[`true`]: sync the public folder.
 */

/**
 * @typedef {Object} Paths
 * @property {string} allPagesDataFile - Path[`file`]: containing all pages data.
 * @property {string} postsDatasFile - Path[`file`]: containing posts data.
 * @property {string} categories - Path[`file`]: containing categories data.
 * @property {string} scheduledPostsFile - Path[`file`]: containing scheduled posts.
 * @property {string} authorsDataFile - Path[`file`]: containing authors data.
 * @property {string} aiFile - Path[`file`]: AI settings file.
 * @property {string} generalFile - Path[`file`]: general settings file.
 * @property {string} integrationsFile - Path[`file`]: integrations settings file.
 * @property {string} logosFile - Path[`file`]: logos settings file.
 * @property {string} themeFile - Path[`file`]: theme settings file.
 * @property {string} businessFile - Path[`file`]: business settings file.
 * @property {string} versionFile - Path[`file`]: version settings file.
 * @property {string} stylesPath - Path[`directory`]: styles directory.
 * @property {string} draftsPath - Path[`directory`]: drafts directory.
 * @property {string} publicSourcePath - Path[`directory`]: public source directory.
 * @property {string} destinationSourcePath - Path[`directory`]: destination source directory.
 * @property {string} workflowsDir - Path[`directory`]: GitHub workflows directory.
 */

/**
 * @typedef {Object} ApiKeys
 * @property {string} chatGPT - API key for accessing ChatGPT.
 * @property {string} cloudinary - API key for accessing Cloudinary.
 */
const mainProps = {
  configs: {
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
  paths: {
    allPagesDataFile: path.join(
      `${appRoot}`,
      `/brand/.cache/allPagesData.json`
    ),
    postsDatasFile: path.join(`${appRoot}`, `/brand/.cache/postsDatas.json`),
    categories: path.join(`${appRoot}`, `/brand/.cache/allPostsData.json`),
    scheduledPostsFile: path.join(
      `${appRoot}`,
      `/brand/.cache/scheduledPosts.json`
    ),
    draftsPath: path.join(`${appRoot}`, `/brand/ai_drafts`),
    contentPath: path.join(`${appRoot}`, `/brand`),
    authorsDataFile: path.join(`${appRoot}`, `/brand/.cache/authorsData.json`),
    aiFile: path.join(`${appRoot}`, `/brand/settings/ai.json`),
    autoPostFile: path.join(`${appRoot}`, `/brand/settings/autoPost.json`),
    generalFile: path.join(`${appRoot}`, `/brand/settings/general.json`),
    integrationsFile: path.join(
      `${appRoot}`,
      `/brand/settings/integrations.json`
    ),
    logosFile: path.join(`${appRoot}`, `/brand/settings/logos.json`),
    themeFile: path.join(`${appRoot}`, `/brand/settings/theme.json`),
    businessFile: path.join(`${appRoot}`, `/brand/settings/business.json`),
    versionFile: path.join(`${appRoot}`, `/brand/settings/version.json`),
    stylesPath: path.join(`${appRoot}`, `/brand/styles`),
    publicSourcePath: path.join(`${appRoot}`, `/brand/public`),
    destinationSourcePath: path.join(`${appRoot}`, `/blog/public`),
    workflowsDir: path.join(`${appRoot}`, `/.github/workflows`),
  },
  apiKeys: {
    chatGPT: process.env.CHATGPT_API_KEY,
    cloudinary: process.env.CLOUDINARY_API_SECRET,
  },
  autoPost: false,
  debug: true,
  devMode: false,
};

module.exports = mainProps;
