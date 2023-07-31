import { useRoutes } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("@/components/pages/Home"));
const Collection = lazy(() => import("@/components/pages/Collection"));
const DetailPage = lazy(() => import("@/components/pages/DetailPage"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));
const DetailCollection = lazy(() => import("@/components/pages/DetailCollection"));

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/collection",
      children: [
        { index: true, element: <Collection /> },
        { path: "/collection/:name", element: <DetailCollection /> },
      ],
    },
    {
      path: "/details/:id",
      element: <DetailPage />,
    },
    {
      path: "/collection/:name",
      element: <DetailCollection />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
}
