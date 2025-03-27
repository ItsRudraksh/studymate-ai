import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function DashboardHeader() {
  return (
    <div className="w-full bg-background border-b flex items-center justify-between px-6 py-2">
      <SidebarTrigger />
      <UserButton appearance={dark} />
    </div>
  );
}

export default DashboardHeader;
