import Header from "@/components/Shares/Header";
import React from "react";
import { Outlet } from "react-router-dom";

export default function BasicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
