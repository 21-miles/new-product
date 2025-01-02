import { getDataBySlug, getDraftDataBySlug } from "./getDatas";
import markdownToHtml from "./markdownToHtml";
import postsData from "@/brand/.cache/allPostsData.json";
import slugify from "../lib/slugify";

export async function fetchData(slug) {
  const mdFileData = getDataBySlug(slug);

  let content = await markdownToHtml(mdFileData?.content || "");

  return {
    ...mdFileData,
    content,
  };
}

export async function fetchDraftData(slug) {
  const mdDraftFileData = getDraftDataBySlug(slug);
  let contentDraft = await markdownToHtml(mdDraftFileData?.content || "");

  return {
    ...mdDraftFileData,
    content: contentDraft,
  };
}

export async function fetchCategoryData(category) {
  console.log("fetchCategoryData - category:", category);

  const posts = postsData.posts.filter((post) =>
    post.frontmatter.categories.some((cat) => slugify(cat) === category)
  );
  // console.log("fetchCategoryData - posts:", posts);

  return posts.length > 0 ? { posts } : { content: "" };
}
