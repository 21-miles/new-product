const baseTemplate = `
import React from "react";
import { fetchData } from "@/src/lib/dataFetchers";
import { getComponentByFolder } from "@/src/lib/renderComponent";

const Post = (mdFile) => {
  if (mdFile.content === "") {
    return <CategoryPage post={mdFile} />;
  }

  const Component = getComponentByFolder(mdFile?.parentFolder);
  return <Component post={mdFile} />;
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
    },
  };
};

export const getStaticPaths = async () => {
  const postsSlugs = [
    ...new Set(
      postsData.posts.map((po) => \`\${taxonomy.posts}/\${po?.slug}\`).flat()
    ),
  ];
  const pagesSlugs = [
    ...new Set(
      pagesData.pages.map((pa) => \`\${taxonomy.pages}/\${pa?.slug}\`).flat()
    ),
  ];
  const customSlugs = [
    ...new Set(
      customData.custom.map((cu) => \`\${taxonomy.custom}/\${cu?.slug}\`).flat()
    ),
  ];

  const concatPaths = postsSlugs
    .concat(pagesSlugs)
    .concat(customSlugs)
    .concat(categories.categories);
  let paths = [];
  concatPaths.forEach((cat) => {
    paths.push({ params: { slug: cat } });
  });
  console.log(concatPaths);
  return {
    paths,
    fallback: false,
  };
};
`;

module.exports = baseTemplate;
