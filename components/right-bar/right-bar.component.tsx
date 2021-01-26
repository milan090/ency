import Chat from "components/chat/chat.component";
import React from "react";

const RightBar: React.FC = () => {
  return (
    <div className="bg-white w-4/12">
      <div className="flex flex-col justify-between h-screen">
        <div></div>

        <Chat />
      </div>
    </div>
  );
};

export default RightBar;
