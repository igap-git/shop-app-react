import { fetchProduct } from "@/infrastructure/api/productApi";

export const getProductByIdUseCase = async (id: number) => {
  return fetchProduct(id);
};