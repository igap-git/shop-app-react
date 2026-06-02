import type { ReactNode } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <aside
      className="
        w-44
        sm:w-52
        md:w-60
        lg:w-72
        h-max
        border-r
        bg-white
        flex flex-col
        transition-all
      "
    >
      {children}
    </aside>
  );
};

export const SidebarHeader = ({ children }: { children: ReactNode }) => {
  return <div className="p-2 sm:p-3 md:p-4 border-b">{children}</div>;
};

export const SidebarBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">{children}</div>
  );
};

export const SidebarSection = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export const SidebarSearch = ({ icon }: { icon: ReactNode }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [value, setValue] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const searchValue = value.trim();

    if (!searchValue) return;

    navigate({
      to: '/home',
      search: {
        search: searchValue,
        page: 1,
      },
    });
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
            px-2 sm:px-3
            py-2
            border
            rounded-lg
            text-xs sm:text-sm
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
            flex items-center
            gap-2 sm:gap-3
            px-2 sm:px-3
            py-2
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
        flex items-center
        gap-2 sm:gap-3
        px-2 sm:px-3
        py-2
        rounded-lg
        text-gray-700
        hover:bg-gray-100
        transition
      "
      activeProps={{
        className:
          'bg-gray-100 text-black font-semibold border border-gray-200',
      }}
    >
      {children}
    </Link>
  );
};

export const SidebarLabel = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text-xs sm:text-sm font-medium truncate">{children}</span>
  );
};

export const SidebarDropdown = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          w-full
          flex items-center
          justify-between
          gap-2
          px-2 sm:px-3
          py-2
          rounded-lg
          text-gray-700
          hover:bg-gray-100
          transition
        "
      >
        <SidebarLabel>{title}</SidebarLabel>

        {isOpen ? (
          <ChevronDownIcon className="w-4 h-4 shrink-0" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="ml-2 sm:ml-4 mt-2 flex flex-col gap-2">{children}</div>
      )}
    </div>
  );
};

export const SidebarDropdownItem = ({
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
        w-full
        flex items-center
        gap-2 sm:gap-3
        px-2 sm:px-3
        py-2
        rounded-lg
        text-xs sm:text-sm
        text-gray-600
        transition
        hover:bg-gray-100
        hover:text-black
      "
      activeProps={{
        className: 'bg-gray-100 text-black font-semibold',
      }}
    >
      {children}
    </Link>
  );
};
