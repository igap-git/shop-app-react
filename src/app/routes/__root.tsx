import MainLayout from '@layouts/MainLayout';
import { createRootRoute, redirect } from '@tanstack/react-router';

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const user = localStorage.getItem('currentUser');

    const publicRoutes = ['/login', '/register'];

    const isPublic = publicRoutes.includes(location.pathname);

    if (!user && !isPublic) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },

  component: MainLayout,
});
