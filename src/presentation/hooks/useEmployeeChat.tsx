import { useEffect, useRef, useState } from 'react';
import { createChatMessageUseCase } from '@application-chat/createChatMessage.usecase';
import { filterMessagesByEmployeeUseCase } from '@application-chat/filterMessageByEmployee.usecase';
import { sendChatMessageUseCase } from '@application-chat/sendChatMessage.usecase';
import type { ChatMessage } from '@domain-types/chatMessage';

export const useEmployeeChat = (selectedEmployee: number | null) => {
  const socketRef = useRef<WebSocket | null>(null);

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket('wss://ws.ifelse.io');

    socketRef.current = socket;

    socket.onmessage = (event) => {
      if (!selectedEmployee) return;

      const receivedMessage = createChatMessageUseCase({
        text: event.data,
        sender: 'server',
        employeeId: selectedEmployee,
      });

      setMessages((prev) => [...prev, receivedMessage]);
    };

    return () => {
      socket.close();
    };
  }, [selectedEmployee]);

  const sendMessage = () => {
    if (!selectedEmployee) return;

    const wasSent = sendChatMessageUseCase({
      socket: socketRef.current,
      text: message,
    });

    if (!wasSent) return;

    const myMessage = createChatMessageUseCase({
      text: message,
      sender: 'me',
      employeeId: selectedEmployee,
    });

    setMessages((prev) => [...prev, myMessage]);

    setMessage('');
  };

  const currentMessages = filterMessagesByEmployeeUseCase(
    messages,
    selectedEmployee
  );

  return {
    message,
    setMessage,
    sendMessage,
    currentMessages,
  };
};
