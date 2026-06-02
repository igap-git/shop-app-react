import { useQuery } from "@tanstack/react-query";
import { getEmployeesUseCase } from "@application-employees/getEmployees.usecase";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployeesUseCase,
    staleTime: 1000 * 60 * 10,
  });
};