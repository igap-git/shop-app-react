import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export const Sidebar = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <aside className="w-72 h-screen border-r bg-white flex flex-col">
      {children}
    </aside>
  );
};

export const SidebarHeader = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="p-4 border-b">
      {children}
    </div>
  );
};

export const SidebarBody = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {children}
    </div>
  );
};

export const SidebarSection = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {children}
    </div>
  );
};

export const SidebarSearch = ({
    icon,
  }: {
    icon: ReactNode;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
  
    const handleSearch = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Enter" && value.trim()) {
        window.location.href = `/home?search=${value}`;
      }
    };
  
    return (
      <>
        {isOpen ? (
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="e.g. perfume"
            className="
              w-full
              px-3 py-2
              border rounded-lg
              text-sm
              outline-none
              focus:border-black
            "
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="
              w-full
              flex items-center gap-3
              px-3 py-2
              rounded-lg
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            {icon}
            <SidebarLabel>Search</SidebarLabel>
          </button>
        )}
      </>
    );
  };

export const SidebarItem = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => {
  return (
    <Link
      to={to}
      activeOptions={{
        exact: true,
      }}
      className="
        flex items-center gap-3
        px-3 py-2
        rounded-lg
        text-gray-700
        hover:bg-gray-100
        transition
      "
      activeProps={{
        className:
          "bg-gray-100 text-black font-semibold border border-gray-200",
      }}
    >
      {children}
    </Link>
  );
};

export const SidebarLabel = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <span className="text-sm font-medium">
      {children}
    </span>
  );
};