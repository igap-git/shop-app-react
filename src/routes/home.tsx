import { createFileRoute } from '@tanstack/react-router'
import { AppProductGrid } from '../components/productgrid/AppProductGrid'

export const Route = createFileRoute('/home')({
  component: AppProductGrid,
})


