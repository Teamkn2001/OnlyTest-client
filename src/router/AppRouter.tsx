import Header from "@/components/Shares/Header";
import BasicLayout from "@/Layout/BasicLayout";
import FormBestPratice from "@/pages/FormBestPratice";
import PDF from "@/pages/PDF";
import PlayGrid from "@/pages/PlayGrid";
import UsageExample from "@/pages/Sample";
import Simple2 from "@/pages/SampleAlert";
import { ExampleUsage } from "@/pages/WorkBank";
// import Practice, { ExampleUsage } from "@/pages/WorkBank";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children :[
      {
        index: true,
        element: <UsageExample />,
      },
      {
        path: "/sample",
        element: <Simple2 />,
      },
      {
        path: "/grid",
        element: <PlayGrid />,
      },
      {
        path: "/pdf",
        element: <PDF />,
      },
      {
        path: "/form",
        element: <FormBestPratice />,
      },
      {
        path: '/workBank',  
        element: <ExampleUsage />,
      }
    ],
  },
]);

export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
