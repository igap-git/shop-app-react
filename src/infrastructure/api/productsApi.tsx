import axios from "axios";
import type { Product } from "@domain-interfaces/product.interface";

type ProductsResponse = {
  products: Product[];
};

export const fetchProducts = async (
  category?: string,
  search?: string
): Promise<ProductsResponse> => {
  let url = "https://dummyjson.com/products?limit=0";

  if (search) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
      search
    )}&limit=0`;
  } else if (category) {
    url = `https://dummyjson.com/products/category/${category}?limit=0`;
  }

  const response = await axios.get<ProductsResponse>(url);

  return response.data;
};
