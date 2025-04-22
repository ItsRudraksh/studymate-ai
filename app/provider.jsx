"use client";
import ModeToggle from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/theme-provider";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { CourseProvider } from "./context/CourseContext";

function Provider({ children }) {
  const { user } = useUser();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (user && user.id) {
      checkIsNewUser();
    }
  }, [user]);

  const checkIsNewUser = async () => {
    const res = await axios.post("/api/create-user", { user: user });
  };

  if (isHomePage) {
    return <div className="w-screen h-screen">{children}</div>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem>
      <CourseProvider>
        <div className="w-screen h-screen">
          <div className="fixed right-2 bottom-2 shadow-md z-[1000]">
            <ModeToggle />
          </div>
          <div>{children}</div>
        </div>
      </CourseProvider>
    </ThemeProvider>
  );
}

export default Provider;
