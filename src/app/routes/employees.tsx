import { createFileRoute } from '@tanstack/react-router'
import { EmployeesPage } from '../../presentation/pages/EmployeesPage'

export const Route = createFileRoute('/employees')({
  component: EmployeesPage
})

