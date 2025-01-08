import PageRoutes from "../PageRoutes";
import DarkModeToggle from "../Components/DarkModeToggle";
import useDarkMode from "../hooks/useDarkMode";
import { useLocation } from "react-router-dom";

const PageLayout = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const isNotHome = location.pathname !== "/";

  return (
    <div className="w-full h-screen text-black bg-white dark:bg-gray-900 dark:text-white">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {isNotHome && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="cursor-pointer size-6"
              onClick={() => window.history.back()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          )}

          <h1 className="text-xl font-bold">Knacx Exam</h1>
        </div>

        <DarkModeToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </header>
      <main className="p-4">
        <PageRoutes />
      </main>
    </div>
  );
};

export default PageLayout;
