import { fetchProducts } from '@/infrastructure/api/productsApi';
import { useQuery } from '@tanstack/react-query';

export function useProducts(category?: string, search?: string) {
  return useQuery({
    queryKey: ['products', category, search],
    queryFn: () => fetchProducts(category, search),
    staleTime: 1000 * 60 * 5,
  });
}
