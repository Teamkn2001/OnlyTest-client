import GameLayout from "@/features/game/Layouts/GameLayout";
import CardGame2 from "@/features/game/Components/OneCardAvailablePlay";
import Exam from "@/features/Exams/components/Exam";
import BasicLayout from "@/Layout/BasicLayout";
import CardGame from "@/features/game/Components/CircleTemplate";
import Dashboard from "@/pages/Dashboard";
import DnDBasic from "@/pages/DnDBasic";
import ExcelTable from "@/pages/ExcelTable";
import FormBestPratice from "@/pages/FormBestPratice";
import Hooker from "@/pages/Hooker";
import JotaiPage from "@/pages/Jotai";
import MentimeterEmbed from "@/pages/mentimeter/MentimeterSample";
import PDF from "@/pages/PDF";
import PlayGrid from "@/pages/PlayGrid";
import UsageExample from "@/pages/Sample";
import Simple2 from "@/pages/SampleAlert";
import Shadcn from "@/pages/Shadcn";
import Styler from "@/pages/Styler";
import { ExampleUsage } from "@/pages/WorkBank";
import ZustandStorage from "@/pages/ZustandStorage";
// import Practice, { ExampleUsage } from "@/pages/WorkBank";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RankingStat from "@/features/game/Components/RankingState";
import { exampleCharacters } from "@/features/game/mock";
import BaseLayout from "@/Layout/BaseLayout";

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
      },
      {
        path: '/hooker',  
        element: <Hooker />,
      },
      {
        path: '/excelTable',
        element: <ExcelTable />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/shadcn',
        element: <Shadcn />,
      },
      {
        path: '/DnDBasic',
        element: <DnDBasic />,
      },
      {
        path: '/styler',
        element: <Styler />,
      },
      {
        path: '/jotai',
        element: <JotaiPage />,
      },
      {
        path: '/zustand',
        element: <ZustandStorage />,
      },
      {
        path: '/card',
        element: <CardGame />,
      }
    ],
  },

  {
    path: "/game",
    element: <GameLayout />,
    children: [
      {
        index: true,
        element: <CardGame />,
      },
      {
        path: "oneCardGame",
        element: <CardGame2 />,
      },
      {
        path: "rankingStat",
        element: <RankingStat initialCharacters={exampleCharacters} statTypes={['attack' , 'speed']}/>,
      }
    ]
  },

  {
    path: "/exam",
    element: <GameLayout />,
    children: [
      {
        index: true,
        element: <Exam />,
      }
    ]
  },

  {
    path: "mentimeter",
    element: <MentimeterEmbed votingCode="alnuj8top2k2" />,
  },

  {
    path: "/head",
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Exam />,
      }
    ]
  }


]);

export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
