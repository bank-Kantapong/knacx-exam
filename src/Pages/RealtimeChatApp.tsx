import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatBox from "../Components/ChatBox";
import ChatList from "../Components/ChatList";
import RegisterChatMember from "../Components/RegisterChatMember";

export interface FormValues {
  email: string;
  password: string;
}

export interface Member {
  id: string;
  name: string;
  color: string;
}

export interface Message {
  text: string;
  email?: string;
  timestamp?: number;
  id: string;
  name: string;
  color: string;
}

const RealtimeChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [memberData, setMemberData] = useState<Member | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  const onSubmitForm = (values: FormValues) => {
    const getNameLetter = values.email.charAt(0)?.toUpperCase();
    const id = Math.random().toString(36).slice(2);
    const randomColor =
      "#" + (Math.random().toString(16) + "000000").substring(2, 8);
    setMemberData({ id, name: getNameLetter, color: randomColor });
  };

  const sendMessage = useCallback(
    (message: Message) => {
      if (!socket) return;
      socket.emit("send_message", message);
      setMessages((prev) => [...prev, message]);
    },
    [socket]
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Real-Time Chat App</h1>
      {memberData ? (
        <div className="flex items-center justify-center">
          <div className="relative flex flex-col justify-between w-1/3 h-full p-4 overflow-auto bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-500 dark:border-none min-h-96">
            <ChatList messages={messages} />
            {memberData && (
              <ChatBox memberData={memberData} onSendMessage={sendMessage} />
            )}
          </div>
        </div>
      ) : (
        <RegisterChatMember onSubmitForm={onSubmitForm} />
      )}
    </div>
  );
};

export default RealtimeChatApp;
