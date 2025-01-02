const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const appRoot = require("app-root-path");
const logger = require("../config/logger");
const slugify = require("slugify");

class StreamCacheData {
  constructor(config) {
    logger.info("Iniciando construtor de StreamCacheData...");
    this.config = config;
    this.port = config.port || 4040;
    this.app = express();
    this.app.use(express.json()); // Middleware para parsear JSON
    this.app.use(cors()); // Middleware para habilitar CORS
    logger.info("Construtor de StreamCacheData concluído com sucesso.");
  }

  async importCacheFiles(fileName) {
    const cacheDir = path.join(appRoot.path, "brand/.cache");
    const filePath = path.join(cacheDir, fileName);
    logger.info(`Importando arquivo de cache: ${filePath}`);
    return fs.readJson(filePath);
  }

  async writeMarkdownFile(type, slug, content) {
    const dir = path.join(appRoot.path, `brand/${type}`);
    const filePath = path.join(dir, `${slug}.md`);
    logger.info(`Escrevendo arquivo Markdown: ${filePath}`);
    await fs.outputFile(filePath, content);
    logger.info(`Arquivo Markdown escrito com sucesso: ${filePath}`);
  }

  async deleteMarkdownFile(type, slug) {
    const dir = path.join(appRoot.path, `brand/${type}`);
    const filePath = path.join(dir, `${slug}.md`);
    logger.info(`Deletando arquivo Markdown: ${filePath}`);
    await fs.remove(filePath);
    logger.info(`Arquivo Markdown deletado com sucesso: ${filePath}`);
  }

  async syncJson(type) {
    logger.info(`Sincronizando JSON para o tipo: ${type}`);
    const dir = path.join(appRoot.path, `brand/.cache`);
    const filePath = path.join(
      dir,
      `all${type.charAt(0).toUpperCase() + type.slice(1)}Data.json`
    );
    logger.info(`Verificando existência do arquivo JSON: ${filePath}`);
    if (fs.existsSync(filePath)) {
      logger.info(`Arquivo JSON encontrado: ${filePath}`);
      const data = await fs.readJson(filePath);
      await fs.writeJson(filePath, data);
      logger.info(`Arquivo JSON atualizado com sucesso: ${filePath}`);
    } else {
      logger.warn(`Arquivo JSON não encontrado: ${filePath}`);
    }
  }

  setupRoutes() {
    logger.info("Configurando rotas...");

    this.app.get("/api/importCacheFiles/:fileName", async (req, res) => {
      try {
        logger.info(
          `Requisição para /api/importCacheFiles/${req.params.fileName}`
        );
        const cacheData = await this.importCacheFiles(req.params.fileName);
        res.json(cacheData);
      } catch (error) {
        logger.error(
          `❌ - Erro ao carregar o arquivo de cache: ${error.message}`
        );
        res.status(500).send("Erro ao carregar o arquivo de cache");
      }
    });

    this.app.get("/posts", async (req, res) => {
      try {
        logger.info("Requisição para /posts");
        const postsData = await this.importCacheFiles("allPostsData.json");
        res.json(postsData);
      } catch (error) {
        logger.error(`❌ - Erro ao carregar os posts: ${error.message}`);
        res.status(500).send("Erro ao carregar os posts");
      }
    });

    this.app.get("/pages", async (req, res) => {
      try {
        logger.info("Requisição para /pages");
        const pagesData = await this.importCacheFiles("allPagesData.json");
        res.json(pagesData);
      } catch (error) {
        logger.error(`❌ - Erro ao carregar as páginas: ${error.message}`);
        res.status(500).send("Erro ao carregar as páginas");
      }
    });

    this.app.get("/posts/filter", async (req, res) => {
      logger.info("Rota /posts/filter acessada");
      try {
        const postsData = await this.importCacheFiles("allPostsData.json");
        let filteredPosts = postsData.posts;

        logger.info(`Query params: ${JSON.stringify(req.query)}`);

        if (req.query.slug) {
          filteredPosts = filteredPosts.filter(
            (post) => post.slug === req.query.slug
          );
        }
        if (req.query.featured) {
          filteredPosts = filteredPosts.filter(
            (post) =>
              post.frontmatter.featuredPost === (req.query.featured === "true")
          );
        }
        if (req.query.draft) {
          filteredPosts = filteredPosts.filter(
            (post) => post.frontmatter.draft === (req.query.draft === "true")
          );
        }
        if (req.query.category) {
          const categorySlug = slugify(req.query.category).toLowerCase();
          filteredPosts = filteredPosts.filter((post) =>
            post.frontmatter.categories
              .map((cat) => slugify(cat).toLowerCase())
              .includes(categorySlug)
          );
        }
        if (req.query.author) {
          filteredPosts = filteredPosts.filter(
            (post) => post.frontmatter.author === req.query.author
          );
        }
        if (req.query.date) {
          const date = new Date(req.query.date);
          filteredPosts = filteredPosts.filter(
            (post) =>
              new Date(post.frontmatter.date).toDateString() ===
              date.toDateString()
          );
        }
        if (req.query.sortByDate) {
          filteredPosts = filteredPosts.sort((a, b) => {
            const dateA = new Date(a.frontmatter.date);
            const dateB = new Date(b.frontmatter.date);
            return req.query.sortByDate === "asc"
              ? dateA - dateB
              : dateB - dateA;
          });
        }

        res.json({ posts: filteredPosts });
      } catch (error) {
        logger.error(`❌ - Erro ao filtrar os posts: ${error.message}`);
        res.status(500).send("Erro ao filtrar os posts");
      }
    });

    // Rota para criar um novo post/page
    this.app.post("/:type(posts|pages)", async (req, res) => {
      try {
        const { type } = req.params;
        const { slug, content } = req.body;
        const dir = path.join(appRoot.path, `brand/${type}`);
        const filePath = path.join(dir, `${slug}.md`);

        logger.info(
          `Recebendo requisição para criar ${type} com slug: ${slug}`
        );

        if (fs.existsSync(filePath)) {
          logger.warn(`Arquivo já existe: ${filePath}`);
          return res.status(409).send(`Arquivo já existe: ${filePath}`);
        }

        await this.writeMarkdownFile(type, slug, content);
        await this.syncJson(type);
        res.status(201).json({ slug, content });
      } catch (error) {
        logger.error(
          `❌ - Erro ao criar o ${req.params.type}: ${error.message}`
        );
        res.status(500).send(`Erro ao criar o ${req.params.type}`);
      }
    });

    // Rota para ler todos os posts/pages
    this.app.get("/:type(posts|pages)", async (req, res) => {
      try {
        const { type } = req.params;
        const data = await this.importCacheFiles(
          `all${type.charAt(0).toUpperCase() + type.slice(1)}Data.json`
        );
        res.json(data);
      } catch (error) {
        logger.error(
          `❌ - Erro ao carregar os ${req.params.type}: ${error.message}`
        );
        res.status(500).send(`Erro ao carregar os ${req.params.type}`);
      }
    });

    // Rota para atualizar um post/page
    this.app.put("/:type(posts|pages)/:slug", async (req, res) => {
      try {
        const { type, slug } = req.params;
        const { content } = req.body;
        logger.info(
          `Recebendo requisição para atualizar ${type} com slug: ${slug}`
        );
        await this.writeMarkdownFile(type, slug, content);
        await this.syncJson(type);
        res.json({ slug, content });
      } catch (error) {
        logger.error(
          `❌ - Erro ao atualizar o ${req.params.type}: ${error.message}`
        );
        res.status(500).send(`Erro ao atualizar o ${req.params.type}`);
      }
    });

    // Rota para deletar um post/page
    this.app.delete("/:type(posts|pages)/:slug", async (req, res) => {
      try {
        const { type, slug } = req.params;
        logger.info(
          `Recebendo requisição para deletar ${type} com slug: ${slug}`
        );
        await this.deleteMarkdownFile(type, slug);
        await this.syncJson(type);
        res.status(204).send();
      } catch (error) {
        logger.error(
          `❌ - Erro ao deletar o ${req.params.type}: ${error.message}`
        );
        res.status(500).send(`Erro ao deletar o ${req.params.type}`);
      }
    });

    logger.info("Rotas configuradas.");

    // Middleware para capturar erros 404
    this.app.use((req, res, next) => {
      logger.warn(`404 - Not Found: ${req.originalUrl}`);
      res.status(404).send("404 - Not Found");
    });
  }

  async runStreamCache(context) {
    logger.info("🚀 - Iniciando runStreamCache...");
    this.setupRoutes();
    this.app
      .listen(this.port, () => {
        logger.info(
          `🚀 - Servidor de cache rodando em http://localhost:${this.port}`
        );
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          logger.warn(
            `⚠️ - Porta ${this.port} já está em uso. Tentando outra porta...`
          );
          this.port++;
          this.runStreamCache(context);
        } else {
          throw err;
        }
      });
  }
}

module.exports = StreamCacheData;
