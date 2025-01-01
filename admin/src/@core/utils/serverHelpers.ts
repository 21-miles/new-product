import "server-only";
import Cookies from "universal-cookie";

// Type Imports
import type { Settings } from "@core/contexts/settingsContext";
import type { SystemMode } from "@core/types";

// Config Imports
import themeConfig from "@configs/themeConfig";

// Function to get theme from cookies
export const getThemeFromCookies = (req: any) => {
  const cookies = new Cookies(req?.headers?.cookie || "");
  const theme = cookies.get("theme") || themeConfig.defaultTheme;
  return theme;
};

export const getSettingsFromCookie = (req: any): Settings => {
  const cookies = new Cookies(req?.headers?.cookie || "");
  const cookieName = themeConfig.settingsCookieName;
  const cookieValue = cookies.get(cookieName) || "{}";

  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    console.error("Error parsing settings cookie:", error);
    return {} as Settings;
  }
};

export const getMode = (req: any): SystemMode => {
  const settingsCookie = getSettingsFromCookie(req);

  // Get mode from cookie or fallback to theme config
  const _mode = settingsCookie.mode || themeConfig.mode;

  return _mode;
};

// Export getServerMode function
export const getServerMode = (req: any): SystemMode => {
  return getMode(req);
};
