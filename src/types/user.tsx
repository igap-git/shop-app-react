import type { CartItem } from '../interfaces/cartitem.interface';
import type { Product } from '../interfaces/product.interface';

export type User = {
    id: string;
    email: string;
    password: string;
  
    cart: CartItem[];
    favorites: Product[];
  };
