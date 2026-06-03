import { fetchEmployees } from "@/infrastructure/api/employeesApi";
import { useQuery } from "@tanstack/react-query";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    staleTime: 1000 * 60 * 10,
  });
};