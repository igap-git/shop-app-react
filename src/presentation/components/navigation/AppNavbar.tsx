import { useRouter } from '@tanstack/react-router';
import { Navbar, NavbarDivider, NavbarItem, NavbarSection } from './NavBar';
import logo from '@assets/shop-logo.png';
import { getCurrentUserRole, logoutUser } from '@infrastructure-storage/userStorage';

export function AppNavbar() {
  const router = useRouter();

  const role = getCurrentUserRole();

  const handleLogout = () => {
    logoutUser();
    router.navigate({
      to: "/login",
    });
  };

  return (
    <Navbar>
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Shop logo"
          className="w-12 h-12"
        />
      </div>

      <NavbarSection>
        <NavbarItem to="/mycart">
          My Cart
        </NavbarItem>

        {role === "ADMIN" && (
          <>
      <NavbarDivider />
            <NavbarItem to="/statistics/overview">
              Statistics
            </NavbarItem>

            <NavbarDivider />

            <NavbarItem to="/employees">
              Employees
            </NavbarItem>
          </>
        )}

        <NavbarDivider />

        <button
          onClick={handleLogout}
          className="
            px-3 py-1
            text-sm font-medium
            text-red-600
            border border-red-200
            rounded-md
            hover:bg-red-50
            transition
          "
        >
          Logout
        </button>
      </NavbarSection>
    </Navbar>
  );
}