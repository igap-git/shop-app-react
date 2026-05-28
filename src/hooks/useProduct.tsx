import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../api/productApi';
import type { Product } from '../interfaces/product.interface';

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });
};
