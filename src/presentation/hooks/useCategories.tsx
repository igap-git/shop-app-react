import { useQuery } from "@tanstack/react-query";
import { getCategoriesUseCase } from '@application-product/getCategories.usecase';

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesUseCase,
  });
};