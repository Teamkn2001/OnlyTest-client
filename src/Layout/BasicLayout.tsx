import Header from "@/components/Shares/Header";
import { Outlet } from "react-router-dom";

export default function BasicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
