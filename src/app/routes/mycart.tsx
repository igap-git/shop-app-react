import { createFileRoute } from '@tanstack/react-router'
import MyCartPage from '../../presentation/pages/MyCartPage'

export const Route = createFileRoute('/mycart')({
  component: MyCartPage,
})

