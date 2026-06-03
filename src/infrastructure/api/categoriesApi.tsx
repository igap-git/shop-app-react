import axios from "axios";

export const fetchCategories =
  async (): Promise<string[]> => {
    const response = await axios.get<
      string[]
    >(
      "https://dummyjson.com/products/category-list"
    );

    return response.data;
  };