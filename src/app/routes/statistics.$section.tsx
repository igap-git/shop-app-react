import { createFileRoute } from '@tanstack/react-router'
import StatisticsPage from '../../presentation/pages/StatisticPage'

export const Route = createFileRoute('/statistics/$section')({
  component: StatisticsPage,
})


