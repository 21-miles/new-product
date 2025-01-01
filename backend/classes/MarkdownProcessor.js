const fs = require("fs-extra");
const matter = require("gray-matter");
const path = require("path");
const showdown = require("showdown");
const { parse } = require("node-html-parser");
const logger = require("../config/logger");

class MarkdownProcessor {
  *readMDFiles(dir, type) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        yield* this.readMDFiles(filePath, type);
      } else if (path.extname(file.name) === ".md") {
        const isWindowsOS = path.sep === "\\";
        const folderSlash = isWindowsOS ? "\\" : "/";
        const readFile = fs.readFileSync(filePath, "utf8");

        const fileContents = {
          path: dir,
          fileName: file.name,
          parentFolder: dir.split(folderSlash).pop(),
          content: type === "prompt" ? readFile + "\r\nBody\r\n" : readFile,
        };

        const matterContent = matter(fileContents?.content, { excerpt: true });

        if (!matterContent?.content || matterContent.isEmpty) {
          logger.warn(`Warning: Invalid frontmatter content in ${filePath}`);
          continue;
        }

        const { data, content } = matterContent;
        const date = data?.layout === "post" ? data?.date : new Date();

        yield {
          slug: fileContents.fileName.replace(/\.md$/, ""),
          date,
          frontmatter: { ...data, date },
          filePath,
          fileName: fileContents.fileName,
          parentFolder: fileContents.parentFolder,
          draftMode: data?.draft || false,
          content,
          excerpt: matterContent.excerpt,
        };
      }
    }
  }

  async mdDatas(allMDdata, draftMode = false) {
    return JSON.stringify(
      allMDdata.map((ps) => {
        const converter = new showdown.Converter();
        const htmlParse = parse(converter.makeHtml(ps?.content));

        const innerImgs = htmlParse
          .querySelectorAll("img")
          .map((img) => img.getAttribute("src"));

        const innerHeadingstext = htmlParse
          .querySelectorAll("h1, h2, h3, h4, h5, h6")
          .map((heading) => heading.text.trim())
          .filter((text) => text !== "Citations:");

        const firstParagraph = htmlParse.querySelector("p")?.textContent || "";

        return {
          frontmatter: ps?.frontmatter,
          slug: ps?.slug,
          date: ps?.frontmatter.date || new Date(),
          featuredImage: ps?.frontmatter.image || "cover.jpg",
          innerImgs: innerImgs || [],
          headings: innerHeadingstext || [],
          content: ps?.content,
          filePath: ps?.filePath,
          fileName: ps?.fileName,
          parentFolder: ps?.parentFolder,
          excerpt: ps?.excerpt,
          draftMode,
          firstParagraph,
        };
      })
    );
  }
}

module.exports = MarkdownProcessor;
