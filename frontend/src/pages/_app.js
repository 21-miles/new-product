import React from "react";
import Script from "next/script";
import "@fontsource-variable/inter";
import { usePathname } from "next/navigation";

import "../styles/styles.scss";
// import postsData from "@/brand/.cache/allPostsData.json";
import integrations from "@/brand/settings/integrations.json";
// import CookieConsent from "react-cookie-consent";
import { CampaignProvider } from "@/services/context";
function App({ Component, pageProps }) {
  const location = usePathname();

  return (
    <>
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

      {location === "/admin/" ? (
        <>
          <Script
            id="netlifyIdentity"
            async
            dangerouslySetInnerHTML={{
              __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", (user) => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
        `,
            }}
          />
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          />
        </>
      ) : null}
      {location !== "/admin/" ? (
        <Script
          strategy="beforeInteractive"
          crossOrigin="anonymous"
          src="https://rampjs-cdn.system1.com/ramp.js"
          defer
        />
      ) : null}
      <CampaignProvider>
        <Component {...pageProps} />
      </CampaignProvider>
      {/* {!general.cookieConsent || (
        <CookieConsent
          cookieName="mtcookie"
          overlay
          location="bottom"
          buttonText="OK"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        >
          This website collect data to enhance the user experience.{" "}
        </CookieConsent>
      )} */}
    </>
  );
}

export default App;
