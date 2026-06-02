import axios from "axios";
import type { Employee } from "@domain-interfaces/employee.interface";

type EmployeesResponse = {
  users: Employee[];
};

export const fetchEmployees =
  async (): Promise<Employee[]> => {
    const response =
      await axios.get<EmployeesResponse>(
        "https://dummyjson.com/users?limit=10"
      );

    return response.data.users;
  };
  