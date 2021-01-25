import Chat from "components/chat/chat.component";
import React from "react";

const RightBar: React.FC = () => {
  return (
    <div className="bg-white right-0 h-screen w-96">
      <div className="flex justify-end flex-col h-full">
        <Chat />
      </div>
    </div>
  );
};

export default RightBar;
