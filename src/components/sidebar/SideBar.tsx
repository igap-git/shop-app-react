import type{ ReactNode } from "react";

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <aside className="w-72 h-screen border-r bg-white flex flex-col">
      {children}
    </aside>
  );
};

export const SidebarHeader = ({ children }: { children: ReactNode }) => {
  return <div className="p-4 border-b">{children}</div>;
};

export const SidebarBody = ({ children }: { children: ReactNode }) => {
  return <div className="flex-1 overflow-y-auto p-4">{children}</div>;
};

export const SidebarSection = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export const SidebarItem = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="
        flex items-center gap-3
        px-3 py-2
        rounded-lg
        text-gray-700
        hover:bg-gray-100
        transition
      "
    >
      {children}
    </a>
  );
};

export const SidebarLabel = ({ children }: { children: ReactNode }) => {
  return <span className="text-sm font-medium">{children}</span>;
};