export type ChatMessage = {
    id: number;
    text: string;
    sender: 'me' | 'server';
    employeeId: number;
  };
  