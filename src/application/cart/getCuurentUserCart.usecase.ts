import type { CartItem } from "@domain-interfaces/cartitem.interface";
import { getCurrentUser } from "@infrastructure-storage/userStorage";

export const getCurrentCartUseCase =
  (): CartItem[] => {
    const user = getCurrentUser();

    return user?.cart ?? [];
  };