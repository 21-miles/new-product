import React from "react";
import { fetchData } from "@/src/lib/dataFetchers";
import { renderComponent } from "@/src/lib/renderComponent";
import taxonomy from "@/content/settings/taxonomy.json"; // Import taxonomy

const Post = (mdFile) => {
  // console.log("mdFile:", mdFile);

  return renderComponent(mdFile);
};

export default Post;

export const getStaticProps = async (context) => {
  if (!context) {
    throw new Error("Error: No !context!");
  }
  if (!context.params) {
    throw new Error("Error: No !context.params!");
  }

  const slug = context.params.slug;
  if (!slug) {
    throw new Error("Error: No !slug!");
  }

  const mdFileData = await fetchData(slug);

  return {
    props: {
      ...mdFileData,
      isCategory: false,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [];

  for (const [folder, slugPrefix] of Object.entries(taxonomy)) {
    const data = require(`@/content/.cache/all${
      folder.charAt(0).toUpperCase() + folder.slice(1)
    }Data.json`);
    const slugs = data[folder]
      .filter((item) => !item.frontmatter.draft)
      .map((item) => (slugPrefix ? `${slugPrefix}/${item.slug}` : item.slug));
    paths.push(
      ...slugs.map((slug) => {
        return { params: { slug } };
      })
    );
  }

  // console.log("Generated paths:", paths);

  return {
    paths,
    fallback: false,
  };
};
