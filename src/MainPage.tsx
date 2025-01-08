import { useNavigate } from "react-router-dom";
import appList from "./Utils/AppList.json";

interface AppListType {
  path: string;
  name: string;
  description?: string;
}
const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {appList.data.map((item: AppListType) => (
        <div
          key={item.path}
          onClick={() => {
            navigate({
              pathname: `${item.path}`,
            });
          }}
          className="p-4 mb-4 cursor-pointer transition duration-300 transform bg-white rounded-lg shadow-md dark:bg-gray-800 hover:scale-[1.01] hover:text-blue-500 border border-gray-100"
        >
          <h3>{item.name}</h3>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
