import { useEffect, useRef, useState } from 'react';
import { createChatMessageUseCase } from '@application-chat/createChatMessage.usecase';
import { filterMessagesByEmployeeUseCase } from '@application-chat/filterMessageByEmployee.usecase';
import { sendChatMessageUseCase } from '@application-chat/sendChatMessage.usecase';
import type { ChatMessage } from '@domain-types/chatMessage';
import { getSavedMessages, saveMessages } from '@/infrastructure/storage/userStorage';



export const useEmployeeChat = (selectedEmployee: number | null) => {
  const socketRef = useRef<WebSocket | null>(null);

  const selectedEmployeeRef = useRef<number | null>(null);

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getSavedMessages()
  );

  useEffect(() => {
    selectedEmployeeRef.current = selectedEmployee;
  }, [selectedEmployee]);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket('wss://ws.ifelse.io');

    socketRef.current = socket;

    socket.onmessage = (event) => {
      const employeeId = selectedEmployeeRef.current;

      if (!employeeId) return;

      const receivedMessage = createChatMessageUseCase({
        text: event.data,
        sender: 'server',
        employeeId,
      });

      setMessages((prev) => [...prev, receivedMessage]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (!selectedEmployee) return;

    if (!message.trim()) return;

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