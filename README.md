# Digest It - Automation for CI/CD and Content Management

**Digest It** is an NPM module that integrates custom pipelines, content automation, and support for tools like GitHub Actions, Netlify, and ChatGPT.

In a traditional pipeline process, data flows from one phase to another in a linear, predefined manner. However, what sets our approach apart is dynamic customization.

Instead of following a rigid, fixed-conveyor belt flow, we offer the ability to choose events, tasks, or processes to be applied at each phase, allowing the developer or user to customize their data journey based on their needs at the time.

# Detailed Features

- **RSS and Atom Generation**: Automatic creation of feeds to facilitate content distribution.
- **Meta Tags and JSON-LD Schema Generation**: SEO optimization with structured metadata.
- **Sitemap Generation and Visualization**: Facilitates crawling by search engines.
- **Public File Synchronization**: Ensures the latest files are available.
- **Script and Image Optimization**: Enhances site performance.
- **Advanced Integrations**: Includes Cloudinary, Google Analytics, Netlify, and more.

# Pipeline Structure

## 🏗️ **Pre-Build Sync Pipeline**

1. Creation of JSON from Markdown files;
2. ~Data API fetch~;
3. ~Real-Time Sync~;
4. ~Data API Websocket~;
5. Creation of JSON from data.

## 🏗️ **Build Pipeline**

1. Sitemap generation.
2. ads.txt generation.
3. SCSS file generation.
4. Public file synchronization.
5. Cleanup of old GitHub Actions files.
6. Post scheduling.

## 🏗️ **Post Build GitHub Actions**

1. Post scheduling.
2. Content update.

# Integrations and Development Technologies

- 🔌 **Decap CMS**: Simplified content management.
- 🔌 **SendGrid**: For email marketing needs.
- 🔌 **Google Tag Manager and AdSense**: Tag management and monetization.

# Prerequisites

1. **Node.js**: Requires version >= 20.12.2.
2. **NPM**: Requires version >= 7.0.0.
3. **.env Configuration**:
   - `CHATGPT_API_KEY` for ChatGPT integration.
   - `CLOUDINARY_API_SECRET` for Cloudinary support.
4. **GitHub Token**: `secrets.PAT` to enable automations.

# Installation and Usage Types

- **GitHub Workflow**: Task automation directly in GitHub's CI/CD pipeline.
- **package.json**: Local scripts integrated into the project.
- **npx**: Direct execution for quick tasks without installation.
- **JS Class**: Programmatic use in custom projects.

# **Main Services**

- **GitHub**: Native integration with repositories and workflows.
- **GitHub Actions**: Automated tasks and configurable triggers.
- **Static Files**: Generation of static files, sitemaps, and feeds.
- **Cloudinary**: Automation support for image import.
- **ChatGPT**: AI-based content creation.

## **Digest It Main Pipeline**

| Order | Process Name            | Description                          |
| ----- | ----------------------- | ------------------------------------ |
| 1     | Initialization          | Environment setup.                   |
| 2     | Processing Inputs       | Data validation and processing.      |
| 3     | AI Content Generator    | AI-based content generation.         |
| 4     | Export Static Files     | Exporting static files.              |
| 5     | Utilities               | Auxiliary methods for various tasks. |
| 6     | Automation & Scheduling | Process automation and scheduling.   |
| 7     | Sync                    | File synchronization.                |

## **GitHub Actions Interface**

| Feature         | Description                             |
| --------------- | --------------------------------------- |
| Watcher         | Observes folders to start workflows.    |
| Trigger         | Monitors files for triggers.            |
| Schedule        | Executes cron jobs for scheduled posts. |
| Auto Post       | Automates periodic posts with GPT.      |
| Auto Post 2     | Automates scheduled posts with GPT.     |
| Actions Logs    | Records workflow activities.            |
| Trigger Updates | Updates based on triggered actions.     |

# When Should You Use This?

**Digest It** is ideal in the following situations:

1. **Content Automation**: Generation of sitemaps, RSS/Atom feeds, and organization of static files.
2. **AI Integration**: Automated flows for content creation with AI ChatGPT.
3. **Synchronization**: Syncing of public and static file folders in projects.
4. **Workflow Management**: Simplifying and optimizing pipelines in GitHub Actions.
5. **Task Scheduling**: Automating updates and content publications.

# 📜 Usage Examples

## **Via npx**

```bash
npx digest-it update
```

## **In package.json**

```json
"scripts": {
  "update": "node ./node_modules/digest-it/triggers/post-update.js", // root local project
  "update": "node ../node_modules/digest-it/triggers/post-update.js", // inside workspace
  "update": "npx digest-it update", // using npx
  "update": "npm digest-it update", // using npm
  // (...)
  // Next.JS
  "dev": "node ./node_modules/digest-it/triggers/build.js && next dev",
  "build": "node ./node_modules/digest-it/triggers/build.js && next build",
  // Other triggers
  "digest": "node ./node_modules/digest-it/triggers/digest.js",
  "atom": "node ./node_modules/digest-it/triggers/atom.js",
  "autogpt": "node ./node_modules/digest-it/triggers/chatGPT-auto.js",
  "chatgpt": "node ./node_modules/digest-it/triggers/chatGPT.js",
  "content": "node ./node_modules/digest-it/triggers/content.js",
  "decap": "node ./node_modules/digest-it/triggers/decap.js",
  "schedule": "node ./node_modules/digest-it/triggers/post-schedule.js",
  "rss": "node ./node_modules/digest-it/triggers/rss.js",
  "sass": "node ./node_modules/digest-it/triggers/sass.js",
  "sitemaps": "node ./node_modules/digest-it/triggers/sitemaps.js",
  "stories": "node ./node_modules/digest-it/triggers/amp-stories.js",
  "static": "node ./node_modules/digest-it/triggers/static.js",
  "workflows": "node ./node_modules/digest-it/triggers/workflows.js"
}
```

Using the right configurations, you will be able to execute:

```bash
npx digest-it update
```

## **GitHub Actions Workflow**

```yaml
- name: Update posts content
  run: npm run update
```

## **JS Class**

```javascript
const DigestPipeline = require("digest-it");
const pipeline = new DigestPipeline(
  {
    staticFiles: {
      indexSitemap: true,
      postSitemap: true,
      feedsSitemaps: true,
      rss: true,
      atom: true,
    },
    finalPipe: { syncPublicFolder: true },
  },
  {},
  null,
  false,
  true
);
pipeline.run();
```

# 📈 Business Advantages

- **Free Technologies**: Utilize open-source technologies with no additional costs.
- **Easy Maintenance**: Smart code and low-code techniques.
- **High Performance**: Fast and scalable applications.
- **Excellent SEO**: Integrated optimization for better search engine ranking.
- **Automation**: Automated workflows to increase efficiency.
