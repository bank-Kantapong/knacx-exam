import { Message } from "../Pages/RealtimeChatApp";

const ChatList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex flex-col gap-2 overflow-auto">
      {messages.map((msg: Message, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-10 h-10 text-white rounded-full"
            style={{ backgroundColor: msg.color }}
          >
            {msg.name}
          </div>
          <div className="p-2 bg-gray-300 rounded-md dark:text-gray-800">
            <p>{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
