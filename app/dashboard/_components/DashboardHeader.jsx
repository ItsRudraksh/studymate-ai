import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

function DashboardHeader() {
  return (
    <div className="w-full bg-background border-b flex items-center justify-between px-8 py-2">
      <SidebarTrigger />
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
