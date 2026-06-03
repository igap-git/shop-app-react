import { fetchCategories } from "@/infrastructure/api/categoriesApi";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};