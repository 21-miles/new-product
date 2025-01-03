export async function generateMetadata({ data }) {
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
