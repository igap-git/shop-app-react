import type { CartItem } from "@domain-interfaces/cartitem.interface";
import type { User } from "@domain-types/user";
import {
  getCurrentUser,
  updateUser,
} from "../../infrastructure/storage/userStorage";

export const updateCartUseCase = (
  updatedCart: CartItem[]
): User | null => {
  const user = getCurrentUser();

  if (!user) return null;

  const updatedUser: User = {
    ...user,
    cart: updatedCart,
  };

  updateUser(updatedUser);

  return updatedUser;
};