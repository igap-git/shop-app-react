import { createFileRoute } from '@tanstack/react-router'
import FavoritePage from '../../presentation/pages/FavoritePage'

export const Route = createFileRoute('/favorites')({
  component: FavoritePage
})

