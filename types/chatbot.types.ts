export interface ChatMessage {
  from: "USER" | "BOT";
  content: string;
  date: Date;
}

export interface UseChat {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setMessages: (chatMessages: ChatMessage[]) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}
