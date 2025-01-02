import React from "react";
import { useRouter } from "next/router";
import { fetchData, fetchCategoryData } from "@/src/lib/dataFetchers";
import { renderComponent } from "@/src/lib/renderComponent";
import taxonomy from "@/brand/settings/taxonomy.json"; // Import taxonomy
import categories from "@/brand/.cache/allPostsCategories.json"; // Import categories

const DynamicPage = (mdFile) => {
  const router = useRouter();

  // Show loading state while page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log("mdFile subslug:", mdFile);

  return renderComponent(mdFile);
};

export default DynamicPage;

export const getStaticProps = async (context) => {
  console.log("context:", context);

  if (!context) {
    throw new Error("Error: No !context!");
  }
  if (!context.params) {
    throw new Error("Error: No !context.params!");
  }

  const { slug, subslug } = context.params;
  if (!slug || !subslug) {
    throw new Error("Error: No !slug or !subslug!");
  }

  console.log("Fetching data for slug:", slug, "subslug:", subslug);

  let mdFileData;
  let isCategory = false;
  let posts = [];

  if (categories.categories.some((category) => category === subslug)) {
    console.log("await fetchCategoryData(subslug);");
    mdFileData = await fetchCategoryData(subslug);
    isCategory = true;
    posts = mdFileData.posts || [];
  } else {
    console.log("mdFileData = await fetchData(slug, subslug);");

    mdFileData = await fetchData(subslug);
  }

  console.log("mdFileData:", mdFileData);

  return {
    props: {
      ...mdFileData,
      isCategory,
      posts,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [];

  for (const [folder, slugPrefix] of Object.entries(taxonomy)) {
    const data = require(`@/brand/.cache/all${
      folder.charAt(0).toUpperCase() + folder.slice(1)
    }Data.json`);
    const slugs = data[folder]
      .filter((item) => !item.frontmatter.draft)
      .map((item) => (slugPrefix ? `${slugPrefix}/${item.slug}` : item.slug));
    paths.push(
      ...slugs
        .map((slug) => {
          const parts = slug.split("/").filter(Boolean);
          if (parts.length === 2) {
            const [slug, subslug] = parts;
            return { params: { slug, subslug } };
          }
          return null;
        })
        .filter(Boolean)
    );
  }

  // Adiciona caminhos para categorias
  taxonomy.posts !== ""
    ? categories.categories.forEach((category) => {
        const slugPrefix = taxonomy.posts;
        paths.push({ params: { slug: slugPrefix, subslug: category } });
      })
    : null;

  console.log("Generated paths:", paths);

  return {
    paths,
    fallback: false,
  };
};
