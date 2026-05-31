type SendChatMessageParams = {
  socket: WebSocket | null;
  text: string;
};

export const sendChatMessageUseCase = ({
  socket,
  text,
}: SendChatMessageParams): boolean => {
  if (!text.trim()) return false;

  if (socket?.readyState !== WebSocket.OPEN) {
    return false;
  }

  socket.send(text);

  return true;
};
