import { fetchEmployees } from "../../infrastructure/api/employeesApi";

export const getEmployeesUseCase = async () => {
  return fetchEmployees();
};