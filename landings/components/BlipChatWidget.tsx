"use client";
import { useEffect } from "react";

const BlipChatWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/blip-chat-widget@1.11.*";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      new window.BlipChat()
        .withAppKey(process.env.NEXT_PUBLIC_BLIP_API_KEY)
        .withButton({ color: "#2CC3D6" })
        .build();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default BlipChatWidget;
