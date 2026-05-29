import type { CartItem } from '../interfaces/cartitem.interface';
import type { Product } from '../interfaces/product.interface';

export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  email: string;
  password: string;
  role: UserRole;

  cart: CartItem[];
  favorites: Product[];
};

