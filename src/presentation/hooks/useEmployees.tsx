import { useQuery } from "@tanstack/react-query";
import { getEmployeesUseCase } from "../../application/employees/getEmployees.usecase";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployeesUseCase,
  });
};