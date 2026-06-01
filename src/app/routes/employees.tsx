import { createFileRoute } from '@tanstack/react-router'
import { EmployeesPage } from '@pages/EmployeesPage'

export const Route = createFileRoute('/employees')({
  component: EmployeesPage
})

