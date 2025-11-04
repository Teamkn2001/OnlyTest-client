import Header from "@/features/Exams/layouts/Header";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
