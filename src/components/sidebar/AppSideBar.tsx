import {
    Sidebar,
    SidebarBody,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
  } from "./SideBar";
  
  import {
    HomeIcon,
    MagnifyingGlassIcon,
  } from "@heroicons/react/24/solid";
  
  import { useCategories } from "../../hooks/useCategories";
  
  export function AppSidebar() {
    const { data: categories, isLoading } = useCategories();
  
    return (
      <Sidebar>
  
        <SidebarHeader>
          <SidebarSection>
  
            <SidebarItem href="/search">
              <MagnifyingGlassIcon className="w-5 h-5" />
              <SidebarLabel>Search</SidebarLabel>
            </SidebarItem>
  

            <SidebarItem href="/">
              <HomeIcon className="w-5 h-5" />
              <SidebarLabel>Home</SidebarLabel>
            </SidebarItem>

          </SidebarSection>
        </SidebarHeader>
  
        <SidebarBody>
          <SidebarSection>
  
            {isLoading && (
              <SidebarLabel>Loading categories...</SidebarLabel>
            )}
  
            {categories?.map((category) => (
              <SidebarItem
                key={category}
                href={`/category/${category}`}
              >
                <SidebarLabel>{category}</SidebarLabel>
              </SidebarItem>
            ))}
  
          </SidebarSection>
        </SidebarBody>
  
      </Sidebar>
    );
  }