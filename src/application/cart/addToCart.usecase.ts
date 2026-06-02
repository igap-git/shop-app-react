import type { Product } from '@domain-interfaces/product.interface';
import type { CartItem } from '@domain-interfaces/cartitem.interface';
import type { User } from '@domain-types/user';

import {
  getCurrentUser,
  updateUser,
} from '../../infrastructure/storage/userStorage';

export const addToCartUseCase = (product: Product): User | null => {
  const user = getCurrentUser();

  if (!user) return null;

  const cart: CartItem[] = user.cart ?? [];

  const isInCart = cart.some((item) => item.id === product.id);

  const updatedCart = isInCart
    ? cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    : [
        ...cart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ];

  const updatedUser: User = {
    ...user,
    cart: updatedCart,
  };

  updateUser(updatedUser);

  return updatedUser;
};
