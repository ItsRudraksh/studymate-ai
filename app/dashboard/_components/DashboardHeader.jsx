import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function DashboardHeader() {
  return (
    <div className="w-screen bg-blue-300 flex items-center pl-2">
      <SidebarTrigger />
      Header
    </div>
  );
}

export default DashboardHeader;
