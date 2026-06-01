import { createFileRoute } from '@tanstack/react-router'
import FavoritePage from '@pages/FavoritePage'

export const Route = createFileRoute('/favorites')({
  component: FavoritePage
})

