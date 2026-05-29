import { fetchProducts } from "../../infrastructure/api/productsApi";

export const getProductsUseCase = async (
  category?: string,
  search?: string
) => {
  return fetchProducts(category, search);
};