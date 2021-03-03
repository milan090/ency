import { useChat } from "hooks/useChat";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Send } from "react-feather";
import { ChatMessage } from "types/chatbot.types";
import axios from "axios";

const Chat: React.FC = () => {
  const { messages, setMessages, isCollapsed, setIsCollapsed } = useChat();
  const [inputMessage, setInputMessage] = useState("");
  const chatBoxRef = useRef(null);

  const handleSendMessage = (): void => {
    const newMessage: ChatMessage = {
      from: "USER",
      content: inputMessage,
      date: new Date(),
    };
    setMessages([...messages, newMessage]);
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
      date: new Date(),
    };
    setMessages([...messages, newMessage]);
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
    <div
      className="border-t-2 border-gray-300 flex flex-col items-stretch w-full max-w-full transition-all duration-150"
      style={{
        height: !isCollapsed ? "50%" : "8%",
      }}
    >
      <div className="w-full bg-gray-100 flex justify-between items-center">
        <div className="float-left flex items-center">
          <img src="../../brand-logo.svg" alt="logo" width="50px" className="" />
          <div>
            <p className="text-primary text-lg">Ency</p>
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <p className="w-2 h-2 bg-green-300 rounded-full mb-0.5"></p>
              <p className="ml-1">Online</p>
            </div>
          </div>
        </div>

        <button
          className="float-right mr-5 outline-none focus:outline-none focus:bg-gray-300 p-1 hover:bg-gray-200 rounded-full transition-colors duration-150 ease-out"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          {isCollapsed ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div
        id="chat"
        className={`pt-4 overflow-y-scroll w-full px-5 ${isCollapsed ? "hidden" : "block"}`}
        style={{
          minHeight: "70%",
        }}
      >
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

      <div id="chat-input" className={`${isCollapsed ? "hidden" : "flex"} mx-4 mb-3 mt-1 h-10`}>
        <input
          type="text"
          placeholder="Write your message here"
          className="outline-none px-4 py-1.5 bg-gray-200 w-72 rounded-tl-xl rounded-bl-xl"
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          className="py-2 px-3 outline-none focus:outline-none bg-primary rounded-tr-xl rounded-br-xl"
          onClick={handleSendMessage}
        >
          <Send className="stroke-white" />
        </button>
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
      <div className="bg-gray-300 px-3 py-2 rounded-lg rounded-br-none float-right mb-4 flex flex-col w-48 shadow-md">
        <div className="text-sm">{message.content}</div>
        <div>
          <div className="float-right text-gray-500 text-xs">
            <span>{("0" + message.date.getHours().toString()).slice(-2)}</span>
            <span>:</span>
            <span>{("0" + message.date.getMinutes().toString()).slice(-2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BotMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="max-w-xs">
      <div className="bg-blue-500 px-3 py-2 rounded-lg rounded-bl-none mb-4 w-64 flex flex-col shadow-md">
        <div className="text-white text-sm ">{message.content}</div>
        <div>
          <div className="float-right text-xs text-gray-200">
            <span>{("0" + message.date.getHours().toString()).slice(-2)}</span>
            <span>:</span>
            <span>{("0" + message.date.getMinutes().toString()).slice(-2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
