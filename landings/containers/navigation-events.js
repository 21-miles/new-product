"use client";

import { useEffect, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ThemeContext from "../services/ThemeContext";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateUrl } = useContext(ThemeContext);
  useEffect(() => {
    updateUrl(pathname);
    const url = `${pathname}?${searchParams}`;
    console.log("url");
    console.log(url);
    console.log("pathname");
    console.log(pathname);
    console.log("searchParams");
    console.log(searchParams);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return pathname;
}
