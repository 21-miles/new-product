import React, { useState } from "react";
import { fetchDraftData } from "@/src/lib/dataFetchers";
import SinglePost from "@/src/templates/single-post";
import RestrictedPageContainer from "@/containers/RestrictedPageContainer";

const DraftPost = (mdDraftFile) => {
  const [password, setPassword] = useState(null);
  if (mdDraftFile.content === "") return null;
  if (mdDraftFile?.parentFolder !== "posts") return null;

  function setNewPassword(newPass) {
    setPassword(newPass);
  }
  if (!password)
    return <RestrictedPageContainer setPassword={setNewPassword} />;

  return <SinglePost post={mdDraftFile} draftMode={true} killSEO={true} />;
};

export default DraftPost;

export const getStaticProps = async (context) => {
  if (!context) {
    throw new Error("Error: No !context!");
  }
  if (!context.params) {
    throw new Error("Error: No !context.params!");
  }

  const draftSlug = context.params.slug;
  if (!draftSlug) {
    throw new Error("Error: No !slug!");
  }

  const mdDraftFileData = await fetchDraftData(draftSlug);

  return {
    props: {
      ...mdDraftFileData,
    },
  };
};

export const getStaticPaths = async () => {
  const draftPostsSlugs = [
    ...new Set(
      draftJSON
        .concat(scheduledPosts)
        .map((po) => `${taxonomy.posts}/${po?.slug}`)
        .flat()
    ),
  ];
  const concatDraftPaths = draftPostsSlugs;
  let draftPaths = [];
  concatDraftPaths.forEach((cat) => {
    draftPaths.push({ params: { slug: cat } });
  });
  return {
    paths: draftPaths,
    fallback: false,
  };
};
