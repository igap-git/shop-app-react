import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSearch,
  SidebarSection,
  SidebarDropdown,
  SidebarDropdownItem,
} from './SideBar';

import {
  ArrowLeftIcon,
  HomeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

import { useRouterState } from '@tanstack/react-router';
import { useCategories } from '../../hooks/useCategories';

export function AppSidebar() {
  const { data: categories, isLoading } = useCategories();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isStatisticsPage = pathname.startsWith("/statistics")
  const isEmployeesPage = pathname.startsWith("/employees")

  if (isStatisticsPage) {
    return (
      <Sidebar>
        <SidebarHeader>
          <SidebarSection>
            <SidebarItem to="/home">
              <ArrowLeftIcon className="w-5 h-5" />
              <SidebarLabel>Back to shop</SidebarLabel>
            </SidebarItem>
          </SidebarSection>
        </SidebarHeader>
  
        <SidebarBody>
          <SidebarSection>
          <SidebarItem to="/statistics/overview">
              <SidebarLabel>Overview</SidebarLabel>
            </SidebarItem>


            <SidebarDropdown title="Products statistics">
              <SidebarDropdownItem to="/statistics/topProducts">
                <SidebarLabel>Top products</SidebarLabel>
              </SidebarDropdownItem>
  
              <SidebarDropdownItem to="/statistics/productsByCategory">
                <SidebarLabel>Products by category</SidebarLabel>
              </SidebarDropdownItem>
            </SidebarDropdown>
  
            <SidebarDropdown title="Stock statistics">
              <SidebarDropdownItem to="/statistics/stockByCategory">
                <SidebarLabel>Stock by category</SidebarLabel>
              </SidebarDropdownItem>
  
              <SidebarDropdownItem to="/statistics/lowInStock">
                <SidebarLabel>Low stock products</SidebarLabel>
              </SidebarDropdownItem>
            </SidebarDropdown>
  
            <SidebarDropdown title="Income statistics">
              <SidebarDropdownItem to="/statistics/averagePriceByCategory">
                <SidebarLabel>Average price</SidebarLabel>
              </SidebarDropdownItem>
  
            </SidebarDropdown>
  
          </SidebarSection>
        </SidebarBody>
      </Sidebar>
    );
  }

  if (!isEmployeesPage) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarSection>
          <SidebarSearch icon={<MagnifyingGlassIcon className="w-5 h-5" />} />

          <SidebarItem to="/home">
            <HomeIcon className="w-5 h-5" />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>

          <SidebarItem to="/favorites">
            <HeartIcon className="w-5 h-5" />
            <SidebarLabel>Favorites</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>
          {isLoading && <SidebarLabel>Loading categories...</SidebarLabel>}

          {categories?.map((category) => (
            <SidebarItem key={category} to={`/category/${category}`}>
              <SidebarLabel>{category}</SidebarLabel>
            </SidebarItem>
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
  }
}
