import type { Product } from "../../domain/interfaces/product.interface";
import { getCurrentUser, updateUser } from "../../infrastructure/storage/userStorage";

export const toggleFavoriteUseCase = (
    product: Product
  ): Product[] => {
    const user = getCurrentUser();
  
    if (!user) return [];
  
    const exists = user.favorites.some(
      (p) => p.id === product.id
    );
  
    const updatedFavorites = exists
      ? user.favorites.filter(
          (p) => p.id !== product.id
        )
      : [...user.favorites, product];
  
    const updatedUser = {
      ...user,
      favorites: updatedFavorites,
    };
  
    updateUser(updatedUser);
  
    return updatedFavorites;
  };