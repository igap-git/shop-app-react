import { Outlet } from "@tanstack/react-router";
import { AppNavbar } from "../components/navigation/AppNavbar";
import { AppSidebar } from "../components/sidebar/AppSideBar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">

      <AppNavbar />

      <div className="flex flex-1">
        <AppSidebar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
}