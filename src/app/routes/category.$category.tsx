import { createFileRoute } from "@tanstack/react-router";
import CategoryPage from "../../presentation/pages/CategoryPage";

export const Route = createFileRoute("/category/$category")({
  component: CategoryPage,
});

