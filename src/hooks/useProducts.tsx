import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productsApi';

export function useProducts(category?: string, search?: string) {
  return useQuery({
    queryKey: ['products', category, search],
    queryFn: () => fetchProducts(category, search),
  });
}
