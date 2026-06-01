import { useQuery } from '@tanstack/react-query';
import { getProductsUseCase } from "@application-product/getProducts.usecase";

export function useProducts(category?: string, search?: string) {
  return useQuery({
    queryKey: ['products', category, search],
    queryFn: () => getProductsUseCase(category, search),
  });
}
