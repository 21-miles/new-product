const {
  generatePostsSitemap,
  generatePagesSitemap,
  generateIndexSitemap,
  generateFeedsSitemap,
} = require("../lib/sitemaps");
const { writeAtom } = require("../lib/atom");
const { writeRSS } = require("../lib/rss");
const { writeAmpStories } = require("../lib/ampStory");
const executeStep = require("../utils/execute-step");

// Novas importações
const writeAdminConfigs = require("../lib/decap");
const writeAdsTxt = require("../lib/adsTxt");
const writeStylesScss = require("../lib/sass");
const writeRobotsTxt = require("../lib/robots");
const fs = require("fs-extra");
const logger = require("../config/logger");

class StaticFilesGenerator {
  async generateStaticFiles(config, context) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      console.warn("⚠️ - Configuração inválida em generateStaticFiles");
      return;
    }

    const tasks = [
      // Tarefas de sitemaps e feeds
      {
        condition: config.indexSitemap,
        label: "📝 - Generate: Index Sitemaps",
        fn: generateIndexSitemap,
        args: [context.publicSourceFolder, context.siteUrl, context.scope],
        errorMessage: "Erro ao gerar o Index Sitemap",
      },
      {
        condition: config.postSitemap,
        label: "📝 - Generate: Posts Sitemaps",
        fn: generatePostsSitemap,
        args: [
          context.postsDatas,
          context.siteUrl,
          context.scope,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Posts Sitemap",
      },
      {
        condition: config.pageSitemap,
        label: "📝 - Generate: Pages Sitemaps",
        fn: generatePagesSitemap,
        args: [
          context.pagesDatas,
          context.siteUrl,
          context.scope,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Pages Sitemap",
      },
      {
        condition: config.feedsSitemaps,
        label: "📝 - Generate: Feeds Sitemaps",
        fn: generateFeedsSitemap,
        args: [
          context.cardLogo,
          context.siteUrl,
          context.scope,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Feeds Sitemap",
      },
      {
        condition: config.atom,
        label: "📝 - Generate: Atom",
        fn: writeAtom,
        args: [
          {
            postsDatas: context.postsDatas,
            pagesDatas: context.pagesDatas,
            siteDescription: context.siteDescription,
            siteUrl: context.siteUrl,
            i18n: context.i18n,
            brandName: context.brandName,
            brandEmail: context.brandEmail,
            logos: context.logos,
            categories: context.categories,
          },
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o Atom",
      },
      {
        condition: config.rss,
        label: "📝 - Generate: RSS",
        fn: writeRSS,
        args: [
          {
            postsDatas: context.postsDatas,
            pagesDatas: context.pagesDatas,
            siteDescription: context.siteDescription,
            siteUrl: context.siteUrl,
            i18n: context.i18n,
            brandName: context.brandName,
            brandEmail: context.brandEmail,
            logos: context.logos,
            categories: context.categories,
          },
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o RSS",
      },
      {
        condition: config.ampStories,
        label: "📝 - Generate: Amp Stories",
        fn: writeAmpStories,
        args: [
          {
            pagesDatas: context.pagesDatas,
            postsDatas: context.postsDatas,
            siteUrl: context.siteUrl,
            postAuthorLogo: context.postAuthorLogo,
            brandName: context.brandName,
            cardLogo: context.cardLogo,
            publicSourceFolder: context.publicSourceFolder,
          },
        ],
        errorMessage: "Erro ao gerar o Amp Stories",
      },
    ];

    for (const task of tasks) {
      if (task.condition) {
        try {
          await executeStep(task.label, task.fn, task.args);
        } catch (error) {
          console.error(`❌ - ${task.errorMessage}: ${error.message}`);
        }
      }
    }
  }
  async setupEssentialsFiles(config, context) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      console.warn("⚠️ - Configuração inválida em generateStaticFiles");
      return;
    }

    const tasks = [
      // Tarefas de arquivos essenciais (decapCMS, ads.txt, scss, robots.txt)
      {
        condition: config.decapCMS,
        label: "📝 - Generate: Decap CMS Configs",
        fn: writeAdminConfigs,
        args: [
          context.gitRepo,
          context.siteUrl,
          context.cloudName,
          context.cloudApiKey,
          context.markLogo,
          context.nextVersion,
          context.version,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar os arquivos de configuração Decap CMS",
      },
      {
        condition: config.scss,
        label: "📝 - Generate: SCSS Styles",
        fn: writeStylesScss,
        args: [context.theme, context.stylesFolder],
        errorMessage: "Erro ao gerar os arquivos de estilo SCSS",
      },
      {
        condition: config.adsTxt,
        label: "📝 - Generate: Ads.txt",
        fn: writeAdsTxt,
        args: [
          context.adsClientID.split("ca-pub-"),
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o arquivo ads.txt",
      },
      {
        condition: config.robotsTxt,
        label: "📝 - Generate: Robots.txt",
        fn: writeRobotsTxt,
        args: [
          context.postsDatas,
          context.pagesDatas,
          context.siteUrl,
          context.publicSourceFolder,
        ],
        errorMessage: "Erro ao gerar o arquivo robots.txt",
      },
    ];

    for (const task of tasks) {
      if (task.condition) {
        try {
          await executeStep(task.label, task.fn, task.args);
        } catch (error) {
          console.error(`❌ - ${task.errorMessage}: ${error.message}`);
        }
      }
    }
  }

  async generateStaticFilesIfNeeded(context) {
    if (fs.existsSync(context.publicSourceFolder)) {
      logger.info("🚀 - Gerando arquivos estáticos...");
      await this.generateStaticFiles(context.configs.staticFiles, context);
      logger.info("✅ - Arquivos estáticos gerados!");
    }
  }
}

module.exports = StaticFilesGenerator;
