import { Outlet, useRouterState } from "@tanstack/react-router";
import { AppNavbar } from "../components/navigation/AppNavbar";
import { AppSidebar } from "../components/sidebar/AppSideBar";
import { AppAuthNavbar } from "../components/navigation/AppAuthNavbar";

export default function MainLayout() {
    const pathname = useRouterState({
      select: (state) => state.location.pathname,
    });
  
    const isProductPage = pathname.startsWith("/product/");
    const isMyCartPage = pathname.startsWith("/mycart");
    const isAuthPage =
      pathname === "/register" || pathname === "/login";
  
    return (
      <div className="flex flex-col min-h-screen">
        {isAuthPage ? <AppAuthNavbar /> : <AppNavbar />}
  
        <div className="flex flex-1">
          {!isAuthPage && !isProductPage && !isMyCartPage && (
            <AppSidebar />
          )}
  
          <div className="flex-1 p-6 flex justify-center">
            {isAuthPage ? (
              <div className="w-full flex items-center justify-center">
                <Outlet />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    );
  }