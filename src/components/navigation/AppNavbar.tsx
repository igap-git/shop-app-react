import {
    Navbar,
    NavbarItem,
    NavbarSection,
  } from "./NavBar";
  
  import logo from "../../assets/shop-logo.png";
  
  export function AppNavbar() {
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
          <NavbarItem to="/profile">Profile</NavbarItem>
        </NavbarSection>
      </Navbar>
    );
  }