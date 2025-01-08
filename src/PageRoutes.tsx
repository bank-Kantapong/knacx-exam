import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import VirtualizedList from "./Pages/VirtualizedList";
import InfiniteScroll from "./Pages/InfiniteScroll";
import RealtimeChatApp from "./Pages/RealtimeChatApp";
import ProductManagement from "./Pages/ProductManagement";
import PaginationHooks from "./Pages/PaginationHooks";
import ShoppingCart from "./Pages/ShoppingCart";

type RouteType = {
  path: string;
  element: React.ReactNode;
};

const PageRoutes = () => {
  const routeList: RouteType[] = [
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/virtualized-list",
      element: <VirtualizedList />,
    },
    {
      path: "/pagination-hooks",
      element: <PaginationHooks />,
    },
    {
      path: "/infinite-scroll",
      element: <InfiniteScroll />,
    },
    {
      path: "/realtime-chat-app",
      element: <RealtimeChatApp />,
    },
    {
      path: "/product-management-system",
      element: <ProductManagement />,
    },
    {
      path: "/shopping-cart",
      element: <ShoppingCart />,
    },
  ];

  return (
    <Routes>
      {routeList.map((item: RouteType, index: number) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default PageRoutes;
