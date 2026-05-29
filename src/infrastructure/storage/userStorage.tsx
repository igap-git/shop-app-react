import type { User } from '../../domain/types/user';
import type { Product } from '../../domain/interfaces/product.interface';

export const getCurrentUser = (): User | null => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
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

export const updateUser = (updatedUser: User) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );

  saveUsers(updatedUsers);
  saveCurrentUser(updatedUser);
};

export const logoutUser = () => {
    localStorage.removeItem(
      "currentUser"
    );
  };
