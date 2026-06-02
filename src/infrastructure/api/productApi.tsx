import axios from "axios";
import type { Product } from "@domain-interfaces/product.interface";

export const fetchProduct =
  async (
    id: number
  ): Promise<Product> => {
    const response =
      await axios.get<Product>(
        `https://dummyjson.com/products/${id}`
      );

    return response.data;
  };