import type { Product } from '@domain-interfaces/product.interface';

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
};
