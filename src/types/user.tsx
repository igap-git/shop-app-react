import type { CartItem } from '../interfaces/cartitem.interface';
import type { Product } from '../interfaces/product.interface';

export type BaseUser = {
  id: string;
  email: string;
  password: string;
};

export type User = BaseUser & {
  cart: CartItem[];
  favorites: Product[];
};
