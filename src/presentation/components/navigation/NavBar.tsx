import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

export const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="w-full border-b bg-white flex items-center justify-between px-4 py-3">
      {children}
    </nav>
  );
};

export const NavbarDivider = () => {
  return <div className="w-px h-6 bg-gray-300" />;
};

export const NavbarSection = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center gap-3">{children}</div>;
};

export const NavbarItem = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link to={to} className="text-sm text-gray-700 hover:text-black transition">
      {children}
    </Link>
  );
};
