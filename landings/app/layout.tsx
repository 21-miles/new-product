import "@/styles/globals.css";
import "@/styles/helpers.css";
import "@fontsource-variable/work-sans";
import "@fontsource/sedgwick-ave";
import "@fontsource/merriweather";
import "@fontsource/rammetto-one";
import "@fontsource/unkempt";
import "@fontsource/bangers";
import ThemeProvider from "@/services/theme-provider";
import type { Viewport } from "next";
import Script from "next/script";
import integrations from "@/content/integrations.json";
import general from "@/content/general.json";
import theme from "@/content/theme.json";
import business from "@/content/business.json";
import logos from "@/content/logos.json";
import linkTree from "@/content/linkTree.json";
import { devMode } from "@/lib/devMode";
import faq from "@/content/faq.json";
import { Suspense, useEffect } from "react";
import { NavigationEvents } from "../containers/navigation-events";

export const viewport: Viewport = {
  themeColor: theme?.themeColors?.brand_color || "#FF0081",
};
const seoAssemble = (killSeo = true) => {
  const manualData = {
    slug: "",
    title: `A.I. n Web Solutions - 21 Miles`,
    description: `We connect Artificial Intelligence and Web Solutions to develop impactful solutions that keep our clients ahead of the curve.`,
    author: `Edu4Dev`,
    brandPerson: `Milton Bolonha`,
    featuredImage: `https://edu4.dev/assets/images/cover.png`,
    questions: faq.faqItems,
    topology: `page`,
    articleUrl: `https://edu4.dev`,
  };

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
      dateModified: new Date(),
      image: logos?.cardLogo,
      sameAs: socialValues,
    },
  ];

  let arrayQuestions: {
    "@type": string;
    name: any;
    acceptedAnswer: { "@type": string; text: string };
  }[] = [];
  faq.faqItems?.forEach((question) => {
    return arrayQuestions.push({
      "@type": "Question",
      name: question.label,
      acceptedAnswer: {
        "@type": "Answer",
        text: `<p>${question.content}</p>`,
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
    ...manualData,
    siteUrl: general?.siteUrl,
    brandName: business?.brandName,
    brandEmail: business?.brandEmail,
    brandLogo: logo,
    brandPhone: business?.brandPhone,
    brandDescription: business?.brandDescription,
    dateCreated: "2024-11-01 10:11:56",
    dateNow: new Date(),
    datePublished: "2024-11-01 10:11:56",
    i18n: "pt-br",
    keywords: ["Edu4Dev"],
    brandCardImage: logos?.cardLogo,
    fbAppID: null,
    twitter: null,
    // articleSchema: articleSchema,
    webSiteSchema: webSiteSchema,
    orgSchema: orgSchema,
    questionSchema: questionSchema,
    adsAccount: integrations?.googleIntegration?.adsAccount,
  };
  return {
    title: data.title,
    description: data.description,
    author: data.author,
    robots: "index, follow",
    keywords: data.topology === "post" ? undefined : data.keywords?.join(", "),
    icons: {
      icon: logos.faviconLogo || data.brandCardImage,
    },
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
      "google-adsense-account": data.adsAccount,
    },
    script: [
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
};
export const metadata = { ...seoAssemble(false) };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const params = useParams<{ tag: string; item: string }>();

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  // console.log(params);
  // useEffect(() => {

  //   return () => {
  //   };
  // }, []);

  return (
    <html lang="pt" suppressHydrationWarning>
      {integrations?.googleIntegration?.gaID &&
      integrations?.googleIntegration?.gaID !== "" ? (
        <>
          <Script
            strategy="afterInteractive"
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${integrations?.googleIntegration?.gaID}`}
          />
        </>
      ) : null}
      {integrations?.googleIntegration?.gaID &&
      integrations?.googleIntegration?.gaID !== "" ? (
        <>
          <Script
            id="googletagmanager"
            crossOrigin="anonymous"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${integrations?.googleIntegration?.gaID}`}
          />
          <Script
            id="gtag"
            async
            crossOrigin="anonymous"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', '${integrations?.googleIntegration?.gaID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      ) : null}

      <body>
        <ThemeProvider>
          {children}
          <div className="hidden">
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
