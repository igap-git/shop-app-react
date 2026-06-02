import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

export const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="w-full border-b bg-white px-4 py-3">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        {children}
      </div>
    </nav>
  );
};

export const NavbarDivider = () => {
  return <div className="hidden sm:block w-px h-6 bg-gray-300" />;
};

export const NavbarSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:justify-start">
      {children}
    </div>
  );
};

export const NavbarItem = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link
      to={to}
      className="text-sm text-gray-700 hover:text-black transition whitespace-nowrap"
    >
      {children}
    </Link>
  );
};
