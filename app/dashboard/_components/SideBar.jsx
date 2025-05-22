import { LayoutDashboard, Plus, Shield, User, Notebook } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Image } from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upgrade",
    url: "/dashboard/upgrade",
    icon: Shield,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
];

function SideBar() {
  return (
    <div>
      <Sidebar variant="sidebar">
        {/* Logo */}
        <div className="p-4">
          <Link href="/">
            <div className="flex items-center gap-2 px-2">
              <img
                src="/favicon-256x256.png"
                alt="StudyMate AI"
                className="w-10 h-10 object-cover border-2 border-gray-500 rounded-lg"
              />
              <span className="font-semibold text-lg">StudyMate AI</span>
            </div>
          </Link>
          <Button
            asChild
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
            <a href="/create">
              <Plus
                strokeWidth={3}
                className="h-4 w-4"
              />
              Create New
            </a>
          </Button>
        </div>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Credits Card */}
        <SidebarFooter>
          <div className="p-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Available Credits: 5</h3>
              <Progress
                value={(3 / 5) * 100}
                className="h-2 mb-2"
              />
              <p className="text-sm text-muted-foreground mb-2">
                2 Out of 5 Credits Used
              </p>
              <a
                href="/dashboard/upgrade"
                className="text-sm text-blue-500 hover:underline">
                Upgrade to create more
              </a>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

export default SideBar;
