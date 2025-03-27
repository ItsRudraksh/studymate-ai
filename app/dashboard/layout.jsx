import { Metadata } from "next";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Dashboard | StudyMate AI",
  description:
    "Your personalized learning dashboard. Access and manage all your study materials, courses, and learning progress in one place.",
  keywords:
    "learning dashboard, study materials, course management, learning progress, AI education",
};

function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <SideBar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
