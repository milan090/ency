import { useChat } from "hooks/useChat";
import React, { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import { ChatMessage } from "types/chatbot.types";
import axios from "axios";

const Chat: React.FC = () => {
  const { messages, addMessage } = useChat();
  const [inputMessage, setInputMessage] = useState("");
  const chatBoxRef = useRef(null);

  const handleSendMessage = (): void => {
    const newMessage: ChatMessage = {
      from: "USER",
      content: inputMessage,
    };
    addMessage(newMessage);
    setInputMessage("");
  };

  const handleBotReply = async (message: ChatMessage): Promise<void> => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL}/chatter`, {
      text: message.content,
    });
    const data = res.data;
    const reply = data.output;
    const newMessage: ChatMessage = {
      from: "BOT",
      content: reply,
    };
    addMessage(newMessage);
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.from === "USER") {
      handleBotReply(lastMessage);
    }

    if (chatBoxRef.current) {
      (chatBoxRef.current as any).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  return (
    <div className="border-t border-gray-400">
      <div id="chat" className="pt-4 px-4 overflow-y-scroll h-96">
        <div className="flex flex-col items-start" ref={chatBoxRef}>
          {messages.map((message, i) =>
            message.from === "USER" ? (
              <UserMessage key={i} message={message} />
            ) : (
              <BotMessage key={i} message={message} />
            )
          )}
        </div>
      </div>
      <div id="chat-input" className="flex bg-gray-100 border-t border-gray-300">
        <input
          type="text"
          className="outline-none px-2 py-2"
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button className="p-2 outline-none focus:outline-none" onClick={handleSendMessage}>
          <Send />
        </button>
      </div>
      <div className="bg-gray-200 h-10 pt-2 border-t border-gray-300">
        <h3 className="text-center font-semibold">Chat With Ency</h3>
      </div>
    </div>
  );
};

interface MessageProps {
  message: ChatMessage;
}

const UserMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="max-w-xs w-full">
      <div className="bg-gray-300 px-5 py-2 rounded-2xl rounded-br-sm float-right mb-2">
        <p>{message.content}</p>
      </div>
    </div>
  );
};

const BotMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="max-w-xs">
      <div className="bg-blue-500 px-5 py-2 rounded-2xl rounded-bl-sm my-4">
        <p className="text-white">{message.content}</p>
      </div>
    </div>
  );
};

export default Chat;
