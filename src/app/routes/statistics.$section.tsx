import { createFileRoute } from '@tanstack/react-router'
import StatisticsPage from '@pages/StatisticPage'

export const Route = createFileRoute('/statistics/$section')({
  component: StatisticsPage,
})


