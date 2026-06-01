import { useQuery } from '@tanstack/react-query';
import { getProductByIdUseCase } from '@application-product/getProductById.usecase';
import type { Product } from '@domain-interfaces/product.interface';

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductByIdUseCase(id),
  });
};
