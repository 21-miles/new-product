import React, { useState } from "react";

import general from "@/brand/settings/general.json";
import integrations from "@/brand/settings/integrations.json";
import business from "@/brand/settings/business.json";

import SeoContainer from "@/containers/SeoContainer";
import HeaderContainer from "@/containers/HeaderContainer";
import FooterContainer from "@/containers/FooterContainer";

const CustomPage = ({ page }) => {
  if (page.lenght === 0) return null;
  const [btnGClick, setBtnGClick] = useState(null);
  const adClient =
    integrations?.googleIntegration?.adsClientID === "" ||
    integrations?.googleIntegration?.adsClientID === "ca-pub-"
      ? false
      : true;

  const gtagCounter = (id) => {
    if (btnGClick === null && typeof window !== "undefined" && adClient) {
      window?.gtag("event", id);
      setBtnGClick(null);
    }
  };
  const { title } = page.frontmatter;
  const infos = {
    slug: "/" + page?.slug,
    title: `${title} - ${business?.brandName}`,
    description: page?.frontmatter?.description || business?.brandDescription,
    author: business?.brandName,
    keywords: page?.frontmatter?.tag || business?.brandKeywords,
    questions: [],
    topology: "custom",
    articleUrl: `${general?.siteUrl}/${page?.slug}`,
  };
  return (
    <>
      <div className="single-post post-container single-page">
        <SeoContainer killSeo={false} data={infos} />
        <h1>custom page</h1>
        <HeaderContainer
          opt={{
            bgOne: "transparent",
            bgTwo: "transparent",
            classes: "header-block",
            pageHasMenu: false,
          }}
          hasMenu={false}
          gtagCounter={gtagCounter}
          gtag={"gtag"}
        />
        <main className="inner-page main-container-wrapper">
          <div className="main-container main-page">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
          </div>
        </main>
        <FooterContainer />
      </div>
    </>
  );
};

export default CustomPage;
