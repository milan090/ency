import { createContext, useContext, useState } from "react";
import { ChatMessage, UseChat } from "types/chatbot.types";

const chatContext = createContext<UseChat>({
  messages: [],
  setMessages: () => {
    // Pass
  },
  addMessage: () => {
    // pass
  },
});

export function ChatProvider(props: { children: React.ReactNode }): JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (newMessage: ChatMessage): void => {
    setMessages([...messages, newMessage]);
  };

  return (
    <chatContext.Provider
      value={{
        messages,
        setMessages,
        addMessage,
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
}

export function useChat() {
  return useContext(chatContext);
}
