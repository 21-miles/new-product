"use client";

import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ themeDarkness: "light" });
  const [url, setUrl] = useState({
    pathname: null,
  });

  const toggleTheme = () => {
    setTheme(
      theme.themeDarkness === "light"
        ? { themeDarkness: "dark" }
        : { themeDarkness: "light" }
    );
  };

  const updateUrl = (path) => {
    setUrl({
      pathname: path,
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, url, updateUrl }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
