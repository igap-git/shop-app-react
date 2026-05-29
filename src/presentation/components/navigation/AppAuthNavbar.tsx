import { Navbar, NavbarDivider, NavbarItem, NavbarSection } from './NavBar';
import logo from '../../../assets/shop-logo.png';

export function AppAuthNavbar() {
  return (
    <Navbar>
      <div className="flex items-center gap-4">
        <img src={logo} alt="Shop logo" className="w-12 h-12" />
      </div>

      <NavbarSection>
        <NavbarItem to="/register">Register</NavbarItem>
        <NavbarDivider></NavbarDivider>
        <NavbarItem to="/login">Login</NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
