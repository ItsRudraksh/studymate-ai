import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

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
