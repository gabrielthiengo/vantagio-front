import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  title: string;
  page: string;
  children: JSX.Element;
};

export const SidebarItem = ({ title, page, children }: SidebarProps) => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  function onNavigate() {
    navigate(page);
  }

  function isPathMatchingPage(page: string, path: string): boolean {
    if (page === '/') return path === '/';

    return path.startsWith(page) && (path.length === page.length || path[page.length] === '/');
  }

  return (
    <button
      className={`w-full flex text-gray-500 items-center gap-2 py-2 px-4 mb-2 text-sm rounded-lg border-b-2 cursor-pointer hover:bg-secondaryBackground2 hover:text-secondaryBackground hover:border-b-2 hover:border-b-secondaryBackground ${
        isPathMatchingPage(page, path)
          ? 'bg-secondaryBackground2 text-secondaryBackground border-b-2 border-b-secondaryBackground'
          : 'border-b-transparent'
      }`}
      onClick={onNavigate}
    >
      {children}
      <span className="font-semibold tracking-wider">{title}</span>
    </button>
  );
};
