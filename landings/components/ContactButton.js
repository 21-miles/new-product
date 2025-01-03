import React, { useState } from "react";
import theme from "@/content/theme.json";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { FiPaperclip, FiMic, FiCornerDownLeft } from "react-icons/fi";

const contactButtonWrapperStyle = (right, bottom) => {
  return {
    display: "block",
    position: "fixed",
    right: `${right}px`,
    bottom: `${bottom}px`,
    zIndex: 9999,
  };
};

const contactButtonStyle = {
  color: "#fff",
  fontSize: "20px",
  textAlign: "center",
  width: "40px",
  height: "40px",
  borderRadius: "28px",
  cursor: "pointer",
  fontSize: "16px",
  border: `2px solid ${theme?.themeColors?.darkBrandColor || "white"}`,
  backgroundColor: theme.themeColors.brand_color,
};

const popupStyle = {
  position: "absolute",
  bottom: "50px",
  right: "0",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  padding: "10px",
  zIndex: 10000,
  width: "200px",
};

const chatPopupStyle = {
  position: "fixed",
  bottom: "100px",
  right: "20px",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  padding: "10px",
  zIndex: 10001,
  width: "100%",
  maxWidth: "600px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
};

const chatHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #ccc",
  paddingBottom: "10px",
  marginBottom: "10px",
};

const chatBodyStyle = {
  flex: 1,
  overflowY: "scroll",
  padding: "10px",
};

const chatFooterStyle = {
  borderTop: "1px solid #ccc",
  paddingTop: "10px",
};

const contactOptions = [
  { name: "21 A.I.", icon: "🤖", action: "chat" },
  { name: "WhatsApp", icon: "📱", action: "https://wa.me/your-number" },
  {
    name: "Instagram",
    icon: "📷",
    action: "https://instagram.com/your-profile",
  },
  { name: "Telefone", icon: "☎️", action: "tel:your-phone-number" },
  { name: "Celular", icon: "📞", action: "tel:your-mobile-number" },
  { name: "Email", icon: "✉️", action: "mailto:your-email@example.com" },
];

export const ContactButton = ({ right, bottom }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleOptionClick = (option) => {
    if (option.action === "chat") {
      setIsChatOpen(true);
    } else {
      window.open(option.action, "_blank");
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div style={contactButtonWrapperStyle(right, bottom)}>
      <button onClick={togglePopup} style={contactButtonStyle}>
        💬
      </button>
      {isPopupOpen && (
        <div style={popupStyle}>
          <ul>
            {contactOptions.map((option, index) => (
              <li
                key={index}
                className="contact-option"
                style={{
                  listStyle: "none",
                  lineHeight: "32px",
                  borderBottom: "1px solid #ccc",
                  marginBottom: "5px",
                }}
              >
                <button
                  onClick={() => handleOptionClick(option)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    fontSize: "inherit",
                    color: "inherit",
                  }}
                >
                  {option.icon} {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isChatOpen && (
        <div style={chatPopupStyle}>
          <div style={chatHeaderStyle}>
            <h3>Chat</h3>
            <button onClick={closeChat} style={{ cursor: "pointer" }}>
              X
            </button>
          </div>
          <div style={chatBodyStyle}>
            <ChatMessageList>
              <ChatBubble variant="sent">
                <ChatBubbleAvatar fallback="US" />
                <ChatBubbleMessage variant="sent">
                  Hello, how has your day been? I hope you are doing well.
                </ChatBubbleMessage>
              </ChatBubble>
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage variant="received">
                  Hi, I am doing well, thank you for asking. How can I help you
                  today?
                </ChatBubbleMessage>
              </ChatBubble>
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            </ChatMessageList>
          </div>
          <div style={chatFooterStyle}>
            <form className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
              <ChatInput
                placeholder="Type your message here..."
                className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <Button size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <FiCornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
