import { useCallback, useState } from "react";
import { Member } from "../Pages/RealtimeChatApp";

interface ChatroomProps {
  memberData: Member;
  onSendMessage: ({
    id,
    text,
    name,
    color,
  }: {
    id: string;
    text: string;
    name: string;
    color: string;
  }) => void;
}

const ChatBox = ({ memberData, onSendMessage }: ChatroomProps) => {
  const [text, setText] = useState("");

  const onSubmit = useCallback(async () => {
    onSendMessage({
      id: memberData?.id,
      text: text,
      name: memberData?.name,
      color: memberData?.color,
    });
    setText("");
  }, [memberData?.color, memberData?.id, memberData?.name, onSendMessage, text]);

  return (
    <div className="flex items-center justify-between gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full p-2 text-black bg-white border rounded-md"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        className="p-2 text-white bg-blue-500 rounded-md w-fit"
        onClick={onSubmit}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;
