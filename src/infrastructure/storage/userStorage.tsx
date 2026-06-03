import type { User, UserRole } from '@domain-types/user';
import type { Product } from '@domain-interfaces/product.interface';
import type { ChatMessage } from '@/domain/types/chatMessage';

export const getCurrentUser = (): User | null => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const getCurrentUserRole = (): UserRole | null => {
  const savedUser = localStorage.getItem('currentUser');

  if (!savedUser) {
    return null;
  }

  const currentUser = JSON.parse(savedUser);
  return currentUser.role ?? null;
};

export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const saveCurrentUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const loadCurrentUserFavorites = (): Product[] => {
  const user = getCurrentUser();
  return user?.favorites ?? [];
};
export const loadCurrentUserMessages = (): ChatMessage[] => {
  const user = getCurrentUser();
  return user?.chatMessages ?? [];
};

export const saveMessages = (
  messages: ChatMessage[]
) => {
  const user = getCurrentUser();

  if (!user) return;

  const updatedUser = {
    ...user,
    chatMessages: messages,
  };

  updateUser(updatedUser);
};

export const getSavedMessages =
  (): ChatMessage[] => {
    return loadCurrentUserMessages();
  };

export const updateUser = (updatedUser: User) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  saveUsers(updatedUsers);
  saveCurrentUser(updatedUser);
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};
