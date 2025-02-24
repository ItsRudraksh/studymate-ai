import React from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";
import ModeToggle from "@/components/ModeToggle";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

function DashboardLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SidebarProvider>
        <SideBar />
        <div>
          <DashboardHeader />
          <div className="fixed right-2 bottom-2 shadow-md">
            <ModeToggle />
          </div>
          {children}
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default DashboardLayout;
