import type { ChatMessage } from "@domain-types/chatMessage";

export const filterMessagesByEmployeeUseCase = (
  messages: ChatMessage[],
  employeeId: number | null
): ChatMessage[] => {
  if (!employeeId) return [];

  return messages.filter(
    (message) => message.employeeId === employeeId
  );
};