import type { ChatMessage } from '@domain-types/chatMessage';

type CreateChatMessageParams = {
  text: string;
  sender: 'me' | 'server';
  employeeId: number;
};

export const createChatMessageUseCase = ({
  text,
  sender,
  employeeId,
}: CreateChatMessageParams): ChatMessage => {
  return {
    id: Date.now(),
    text,
    sender,
    employeeId,
  };
};
