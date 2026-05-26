import {Outlet, useRouterState} from "@tanstack/react-router";
import { AppNavbar } from "../components/navigation/AppNavbar";
import { AppSidebar } from "../components/sidebar/AppSideBar";
  
  export default function MainLayout() {
    const pathname = useRouterState({
      select: (state) =>
        state.location.pathname,
    });
  
    const isProductPage =
      pathname.startsWith(
        "/product/"
      );

    const isMyCartPage = pathname.startsWith("/mycart");  
  
    return (
      <div className="flex flex-col min-h-screen">
        <AppNavbar />
  
        <div className="flex flex-1">
        {!isProductPage && !isMyCartPage && (
          <AppSidebar />
        )}
  
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }