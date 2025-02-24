"use client";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Laptop } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="p-8">
      {/* Welcome Banner */}
      <Card className="w-full bg-blue-500 text-white p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 rounded-lg">
            <Laptop className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Hello, {user?.fullName || "User"}
            </h1>
            <p className="text-blue-100">
              Welcome Back, Its time to learn new coursr
            </p>
          </div>
        </div>
      </Card>

      {/* Content Area */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add your dashboard cards here */}
      </div>
    </div>
  );
}
