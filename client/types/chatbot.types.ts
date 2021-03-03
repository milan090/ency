import React from "react";

export interface ChatMessage {
  from: "USER" | "BOT";
  content: string | React.ReactNode;
  date: Date;
}

export interface UseChat {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setMessages: (chatMessages: ChatMessage[]) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}
