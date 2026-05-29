export const fetchProducts = async (
  category?: string,
  search?: string
): Promise<{ products: any[] }> => {
  let url = 'https://dummyjson.com/products?limit=0';

  if (search) {
    url = `https://dummyjson.com/products/search?q=${search}&limit=0`;
  } else if (category) {
    url = `https://dummyjson.com/products/category/${category}?limit=0`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
