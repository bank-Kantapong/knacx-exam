const DarkModeToggle = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="sr-only peer"
        />
        <div className="h-6 bg-gray-200 rounded-full w-11 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-800 peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
        <span className="absolute w-4 h-4 transition-transform bg-white border border-gray-300 rounded-full left-1 top-1 peer-checked:translate-x-5 dark:border-gray-600"></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
