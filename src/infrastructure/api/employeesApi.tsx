import type { Employee } from "@domain-interfaces/employee.interface";

type EmployeesResponse = {
  users: Employee[];
};

export const fetchEmployees =
  async (): Promise<Employee[]> => {
    const response = await fetch(
      "https://dummyjson.com/users?limit=10"
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch employees"
      );
    }

    const data: EmployeesResponse =
      await response.json();

    return data.users;
  };
  