import { fetchCategories } from "../../infrastructure/api/categoriesApi";

export const getCategoriesUseCase = async () => {
  return fetchCategories();
};