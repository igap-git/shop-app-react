import { Route } from "@routes/statistics.$section";
import { AppStatistics } from "@components/statistics/AppStatistics";

export default function StatisticPage() {
  const { section } =
    Route.useParams();

  return (
    <AppStatistics
      section={section}
    />
  );
}