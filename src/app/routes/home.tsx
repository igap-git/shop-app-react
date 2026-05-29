import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../../presentation/pages/HomePage'

export const Route = createFileRoute('/home')({
  component: HomePage,
})


