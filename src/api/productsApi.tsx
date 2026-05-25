export const fetchProducts = async (
    category?: string,
    search?: string
  ): Promise<{ products: any[] }> => {
    let url = "https://dummyjson.com/products";
  
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    }
  
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(
        "Failed to fetch products"
      );
    }
  
    return response.json();
  };