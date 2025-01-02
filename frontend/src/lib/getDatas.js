import draftJSON from "@/brand/.cache/allPostsDraftMode.json";
import scheduledPosts from "@/brand/.cache/scheduledPosts.json";
import taxonomy from "@/brand/settings/taxonomy.json"; // Import taxonomy

export function getDataBySlug(slug) {
  console.log("getDataBySlug - slug:", slug);
  let fileContents = [];

  for (const [folder, slugPrefix] of Object.entries(taxonomy)) {
    const data = require(`@/brand/.cache/all${
      folder.charAt(0).toUpperCase() + folder.slice(1)
    }Data.json`);
    fileContents.push(...data[folder].filter((item) => item.slug === slug));
  }

  if (fileContents.length === 0) {
    fileContents = false;
  }
  console.log("getDataBySlug - fileContents:", fileContents);
  return fileContents[0];
}

export function getDraftDataBySlug(slug) {
  if (!slug) return null;
  let fileContents;
  // concat posts n pages n filter by slug, return content
  try {
    fileContents =
      draftJSON?.concat(scheduledPosts).filter((fc) => fc.slug === slug) ||
      null;
  } catch (err) {
    fileContents = false;
  }
  return fileContents[0];
}
