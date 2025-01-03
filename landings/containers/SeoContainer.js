import React from "react";
// import Head from "next/head";
import { generateMetadata } from "@/components/NextSeo";

import integrations from "@/content/integrations.json";
import general from "@/content/general.json";
import theme from "@/content/theme.json";
import business from "@/content/business.json";
import logos from "@/content/logos.json";
import linkTree from "@/content/linkTree.json";
import { devMode } from "@/lib/devMode";

const SeoContainer = ({ data, killSeo = true }) => {
  // const isBrowser = () => typeof window !== "undefined";
  // if (!isBrowser) {
  //   return null;
  // }

  // const getURL = typeof window === "undefined" ? null : window?.location.href;
  // const develop = "https://develop--";
  // const devMode = getURL?.includes(develop) || null;

  if (killSeo || devMode) {
    return (
      <head>
        <title>NO SEO</title>
        <meta name="robots" content={"noindex, nofollow"} />
      </head>
    );
  }
  let socialValues = [];
  for (const key in linkTree.linkTree) {
    socialValues.push(linkTree.linkTree[key].href);
  }
  const logo = logos?.mainLogo?.includes("http")
    ? logos?.mainLogo
    : general?.siteUrl + logos?.mainLogo;
  const orgSchema = [
    {
      "@type": ["Organization"],
      "@context": "https://schema.org",
      name: business?.brandName,
      url: general?.siteUrl,
      email: business?.brandEmail,
      description: business?.brandDescription,
      sameAs: socialValues,
      logo: logos.postAuthorLogo,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: business?.brandPhone,
          contactType: "Contact Point",
        },
      ],
    },
  ];

  const webSiteSchema = [
    {
      "@type": "WebSite",
      "@context": "https://schema.org",
      name: business?.brandName,
      description: business?.brandDescription,
      url: general?.siteUrl,
      keywords: [business?.brandKeywords.map((e) => e)],
      inLanguage: general?.i18n,
      copyrightYear: new Date().getFullYear(),
      datePublished: general?.publishedDate,
      dateModified: data?.dateNow,
      image: logos?.cardLogo,
      sameAs: socialValues,
    },
  ];
  const articleSchema = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      name: data?.title,
      headline: data?.description,
      description: data?.description,
      author: {
        "@type": "Person",
        name: data?.author,
        url: general?.siteUrl,
      },
      image: {
        "@type": "ImageObject",
        url: data?.featuredImage || logos?.cardLogo,
        height: 1200,
        width: 630,
      },
      articleBody:
        typeof data?.articleBody !== "undefined"
          ? data?.articleBody?.toString()
          : data?.description,
      publisher: {
        "@type": "Organization",
        name: business?.brandName,
        url: general?.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: logos?.postAuthorLogo,
          width: 156,
          height: 156,
        },
      },
      datePublished: general?.publishedDate,
    },
  ];
  let arrayQuestions = [];
  data?.questions?.forEach((question) => {
    return arrayQuestions.push({
      "@type": "Question",
      name: question.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: `<p>${question.a}</p>`,
      },
    });
  });

  const questionSchema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [arrayQuestions],
    },
  ];

  const data = {
    author: data?.author,
    siteUrl: general?.siteUrl,
    brandName: business?.brandName,
    brandEmail: business?.brandEmail,
    brandLogo: logo,
    brandPhone: data?.brandPhone,
    title: data?.title,
    brandDescription: business?.brandDescription,
    dateCreated: data?.dateCreated,
    dateNow: data?.dateNow,
    articleBody:
      typeof data?.articleBody !== "undefined"
        ? data?.articleBody?.toString()
        : data?.description,
    datePublished: data?.datePublished,
    i18n: general?.i18n,
    keywords: data?.keywords,
    topology: data?.topology,
    articleUrl: data?.articleUrl,
    description: data?.description,
    brandCardImage: logos?.cardLogo,
    featuredImage: data?.featuredImage,
    themeColor: theme?.themeColors?.brand_color,
    slug: data?.slug,
    fbAppID: data?.fbAppID || null,
    twitter: data?.twitter || null,
    articleSchema: articleSchema,
    webSiteSchema: webSiteSchema,
    orgSchema: orgSchema,
    questionSchema: questionSchema,
    brandPerson: business?.brandName,
    adsAccount: integrations?.googleIntegration?.adsAccount,
  };

  generateMetadata(data);
};

export default SeoContainer;

async function generateMetadata({ data }) {
  if (!data) {
    return {
      title: "NO SEO DATA",
    };
  }

  return {
    title: data.title,
    description: data.description,
    robots: "index, follow",
    keywords: data.topology === "post" ? undefined : data.keywords?.join(", "),
    icons: {
      icon: data.featuredImage || data.brandCardImage,
    },
    themeColor: data.themeColor || "#FF0081",
    alternates: {
      canonical: `${data.siteUrl}${data.slug}`,
    },
    openGraph: {
      type: data.topology === "post" ? "article" : "website",
      url: data.articleUrl,
      siteName: data.title,
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.featuredImage || data.brandCardImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: data.author,
      title: data.title,
      description: data.description,
      images: [data.featuredImage || data.brandCardImage],
    },
    other: {
      "article:author": data.author,
      "article:publisher": data.siteUrl,
      "og:publish_date": data.datePublished,
      "article:published_time": data.datePublished,
      "fb:app_id": data.social?.fbAppID,
      "google-adsense-account": data.adsAccount,
    },
    script: [
      ...(data.topology === "post"
        ? [
            {
              type: "application/ld+json",
              dangerouslySetInnerHTML: JSON.stringify(data.articleSchema),
            },
          ]
        : []),
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: JSON.stringify(data.webSiteSchema),
      },
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: JSON.stringify(data.orgSchema),
      },
    ],
  };
}
