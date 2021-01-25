export interface ChatMessage {
  from: "USER" | "BOT";
  content: string;
}

export interface UseChat {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  setMessages: (chatMessages: ChatMessage[]) => void;
}
