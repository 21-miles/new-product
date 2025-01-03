import React, { useState, useEffect } from "react";
import theme from "@/content/theme.json";

const sendTopWrapperStyle = (right, bottom, scrollState) => {
  return {
    display: "block",
    opacity: scrollState ? "1" : "0",
    position: "fixed",
    right: `${right}px`,
    bottom: `${bottom}px`,
    zIndex: 9999,
    transition: "opacity 0.5s",
  };
};
const sendTopButtonStyle = {
  color: "#fff",
  fontSize: "20px",
  textAlign: "center",
  width: "40px",
  height: "40px",
  borderRadius: "3px",
  cursor: "pointer",
  fontSize: "16px",
  border: `2px solid ${theme?.themeColors?.darkBrandColor || "white"}`,
  backgroundColor: theme.themeColors.brand_color,
};
export const ScrollTop = ({ right, bottom }) => {
  const [scrollState, setScrollState] = useState(false);
  console.log("scrolling 0");

  useEffect(() => {
    // Verificar se o objeto window está disponível
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        console.log("scrolling");

        // Verificar se o scroll passou de 500px
        if (window.scrollY > 500) {
          console.log("setScrollState(true);");

          setScrollState(true);
        } else {
          console.log("setScrollState(false);");
          setScrollState(false);
        }
      };

      // Adicionar o evento de scroll
      window.addEventListener("scroll", handleScroll);

      // Remover o evento de scroll quando o componente for desmontado
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollState]); // O array vazio garante que o efeito será executado apenas uma vez

  return (
    <div
      className="send-to-top"
      style={sendTopWrapperStyle(right, bottom, scrollState)}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={sendTopButtonStyle}
      >
        ▲
      </button>
    </div>
  );
};
