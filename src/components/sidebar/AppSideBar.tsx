import {
    Sidebar,
    SidebarBody,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSearch,
    SidebarSection,
  } from "./SideBar";
  
  import {
    HomeIcon,
    MagnifyingGlassIcon,
  } from "@heroicons/react/24/solid";
  
  import { useCategories } from "../../hooks/useCategories";
  
  export function AppSidebar() 
   {
    const {
      data: categories,
      isLoading,
    } = useCategories();
  
    return (
      <Sidebar>
        <SidebarHeader>
          <SidebarSection>
            <SidebarSearch
              icon={
                <MagnifyingGlassIcon className="w-5 h-5" />
              }
            />
  
            <SidebarItem to="/home">
              <HomeIcon className="w-5 h-5" />
              <SidebarLabel>
                Home
              </SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarHeader>
  
        <SidebarBody>
          <SidebarSection>
            {isLoading && (
              <SidebarLabel>
                Loading categories...
              </SidebarLabel>
            )}
  
            {categories?.map((category) => (
              <SidebarItem
                key={category}
                to={`/category/${category}`}
              >
                <SidebarLabel>
                  {category}
                </SidebarLabel>
              </SidebarItem>
            ))}
          </SidebarSection>
        </SidebarBody>
      </Sidebar>
    );
  }