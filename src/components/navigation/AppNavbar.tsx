import {
    Navbar,
    NavbarDivider,
    NavbarItem,
    NavbarSection,
  } from "./NavBar";
  
  import { Link } from "@tanstack/react-router";
  import logo from "../../assets/shop-logo.png";
  
  export function AppNavbar() {
    return (
      <Navbar>

        <div className="flex items-center gap-4">
          <Link to="/" aria-label="Home">
            <img
              src={logo}
              alt="Shop logo"
              className="w-10 h-10"
            />
          </Link>
  

        </div>
  
        <NavbarSection>
          <NavbarItem to="/">Home</NavbarItem>
          <NavbarItem to="/events">Events</NavbarItem>
          <NavbarItem to="/orders">Orders</NavbarItem>
        </NavbarSection>
      </Navbar>
    );
  }