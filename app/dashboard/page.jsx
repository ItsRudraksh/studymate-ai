"use client";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Laptop } from "lucide-react";
import CourseList from "./_components/CourseList";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="px-2">
      {/* Welcome Banner */}
      <Card className="w-full bg-blue-500 text-white p-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 rounded-lg p-2">
            <img
              src="/favicon-256x256.png"
              alt="StudyMate AI"
              className="w-16 h-16 object-cover aspect-square rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Hello, {user?.fullName || "User"}
            </h1>
            <p className="text-blue-100">
              Welcome Back, Its time to learn new course
            </p>
          </div>
        </div>
      </Card>

      {/* Content Area */}
      <div>
        {/* Add your dashboard cards here */}
        <CourseList />
      </div>
    </div>
  );
}
