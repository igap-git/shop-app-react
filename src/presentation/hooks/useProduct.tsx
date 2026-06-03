import { useQuery } from '@tanstack/react-query';
import type { Product } from '@domain-interfaces/product.interface';
import { fetchProduct } from '@/infrastructure/api/productApi';

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
