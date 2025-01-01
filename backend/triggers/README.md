# Build Pipeline Configuration

This document provides an overview of the `buildPipeline` trigger configuration and how it works.

### Configurations in Table Format

| **Category**           | **Key**               | **Description**                                            | **Default Value** |
| ---------------------- | --------------------- | ---------------------------------------------------------- | ----------------- |
| **Initial Pipeline**   | `deleteOldCrons`      | Deletes old cron jobs.                                     | `false`           |
|                        | `deleteGPTWorkflows`  | Deletes old GPT workflows.                                 | `false`           |
| **Prompt Digestion**   | `promptDigestion`     | Enables/disables the processing of prompts.                | `false`           |
| **Static Files**       | `indexSitemap`        | Enables/disables the generation of the index sitemap.      | `false`           |
|                        | `postSitemap`         | Enables/disables the generation of the post sitemap.       | `false`           |
|                        | `pageSitemap`         | Enables/disables the generation of the page sitemap.       | `false`           |
|                        | `feedsSitemaps`       | Enables/disables the generation of feed sitemaps.          | `false`           |
|                        | `atom`                | Enables/disables Atom feed generation.                     | `false`           |
|                        | `rss`                 | Enables/disables RSS feed generation.                      | `false`           |
|                        | `ampStories`          | Enables/disables the generation of AMP stories.            | `false`           |
| **Essential Files**    | `decapCMS`            | Enables/disables the generation of DecapCMS files.         | `false`           |
|                        | `scss`                | Enables/disables the generation of SCSS files.             | `false`           |
| **Final Pipeline**     | `schedulingPosts`     | Enables/disables the scheduling of posts.                  | `false`           |
|                        | `syncPublicFolder`    | Enables/disables the synchronization of the public folder. | `false`           |
|                        | `generateGPTWorkFlow` | Enables/disables the generation of GPT workflows.          | `false`           |
| **Export Output**      | `enabled`             | Enables/disables the export of pipeline output.            | `false`           |
| **Content Processing** | `processPages`        | Enables/disables the processing of pages.                  | `true`            |
|                        | `processPosts`        | Enables/disables the processing of posts.                  | `true`            |
|                        | `processPrompt`       | Enables/disables the processing of prompts.                | `true`            |
|                        | `processAiAuthors`    | Enables/disables the processing of AI-generated authors.   | `true`            |
| **Custom Folders**     | `customFolders`       | Specifies a list of custom folders to process.             | `["custom"]`      |

Let me know if you'd like further refinements or additional details! 🚀

## Overview

The `buildPipeline` is an instance of the `DigestPipeline` class that automates various tasks related to content management and processing. This pipeline is highly configurable, allowing you to control which features are enabled or disabled based on your requirements.

---

## Configuration Details

### Initial Pipeline Steps

- **`deleteOldCrons`**: _(boolean)_

  - Determines whether old cron jobs should be deleted.
  - Default: `false`

- **`deleteGPTWorkflows`**: _(boolean)_
  - Determines whether old GPT workflows should be deleted.
  - Default: `false`

### Prompt Digestion

- **`promptDigestion`**: _(boolean)_
  - Enables or disables the processing of prompts.
  - Default: `false`

### Static Files Configuration

Controls the generation of static files such as sitemaps and feeds:

- **`indexSitemap`**: _(boolean)_

  - Enables/disables the generation of the index sitemap.
  - Default: `false`

- **`postSitemap`**: _(boolean)_

  - Enables/disables the generation of the post sitemap.
  - Default: `false`

- **`pageSitemap`**: _(boolean)_

  - Enables/disables the generation of the page sitemap.
  - Default: `false`

- **`feedsSitemaps`**: _(boolean)_

  - Enables/disables the generation of feed sitemaps.
  - Default: `false`

- **`atom`**: _(boolean)_

  - Enables/disables Atom feed generation.
  - Default: `false`

- **`rss`**: _(boolean)_

  - Enables/disables RSS feed generation.
  - Default: `false`

- **`ampStories`**: _(boolean)_
  - Enables/disables the generation of AMP stories.
  - Default: `false`

### Essential Files

Controls the generation of essential files:

- **`decapCMS`**: _(boolean)_

  - Enables/disables the generation of DecapCMS files.
  - Default: `false`

- **`scss`**: _(boolean)_
  - Enables/disables the generation of SCSS files.
  - Default: `false`

### Final Pipeline Steps

Configures tasks to be performed at the end of the pipeline:

- **`schedulingPosts`**: _(boolean)_

  - Enables/disables the scheduling of posts.
  - Default: `false`

- **`syncPublicFolder`**: _(boolean)_

  - Enables/disables the synchronization of the public folder.
  - Default: `false`

- **`generateGPTWorkFlow`**: _(boolean)_
  - Enables/disables the generation of GPT workflows.
  - Default: `false`

### Export Output

- **`enabled`**: _(boolean)_
  - Enables/disables the export of pipeline output.
  - Default: `false`

### Content Processing

- **`processPages`**: _(boolean)_

  - Enables/disables the processing of pages.
  - Default: `true`

- **`processPosts`**: _(boolean)_

  - Enables/disables the processing of posts.
  - Default: `true`

- **`processPrompt`**: _(boolean)_

  - Enables/disables the processing of prompts.
  - Default: `true`

- **`processAiAuthors`**: _(boolean)_
  - Enables/disables the processing of AI-generated authors.
  - Default: `true`

### Custom Folders

- **`customFolders`**: _(Array<String>)_
  - Specifies a list of custom folders to process.
  - Default: `["custom"]`

---

## Execution

The pipeline is executed using the `.run()` method. Any errors during execution are logged, and the process exits with a failure code:

```javascript
buildPipeline.run().catch((error) => {
  console.error("❌ - Error during build pipeline execution:", error);
  process.exit(1);
});
```

---

## Notes

1. The `DigestPipeline` class must be properly implemented and imported for the pipeline to work.
2. Additional pipelines can be configured similarly by creating new instances of `DigestPipeline` with custom configurations.

---

## Example

Here is a quick example of how to configure and run the `buildPipeline`:

```javascript
const buildPipeline = new DigestPipeline(
  {
    initialPipe: { deleteOldCrons: true, deleteGPTWorkflows: true },
    promptDigestion: true,
    staticFiles: {
      indexSitemap: true,
      postSitemap: true,
      pageSitemap: true,
      feedsSitemaps: true,
      atom: true,
      rss: true,
      ampStories: true,
    },
    essentialFiles: { decapCMS: true, scss: true },
    finalPipe: {
      schedulingPosts: true,
      syncPublicFolder: true,
      generateGPTWorkFlow: true,
    },
    exportOutput: { enabled: true },
    processPages: true,
    processPosts: true,
    processPrompt: true,
    processAiAuthors: true,
    customFolders: ["custom", "extraFolder"],
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
```
