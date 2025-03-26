import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useToast } from "@/hooks/use-toast";

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    user && getCourseList();
  }, [user]);

  const getCourseList = async () => {
    try {
      const res = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourseList(res.data.result);

      // Check if any course is still generating
      const generatingCourses = res.data.result.filter(
        (course) => course.status === "Generating"
      );
      if (generatingCourses.length > 0) {
        toast({
          title: "Generating Notes",
          description:
            "Your study material is being generated. This may take a few minutes.",
          duration: 5000,
        });

        // Set up polling for generating courses
        const pollInterval = setInterval(async () => {
          const updatedRes = await axios.post("/api/courses", {
            createdBy: user?.primaryEmailAddress?.emailAddress,
          });

          const stillGenerating = updatedRes.data.result.some(
            (course) => course.status === "Generating"
          );
          if (!stillGenerating) {
            clearInterval(pollInterval);
            setCourseList(updatedRes.data.result);
            toast({
              title: "Notes Generated",
              description:
                "Your study material has been generated successfully!",
              duration: 5000,
            });
          } else {
            setCourseList(updatedRes.data.result);
          }
        }, 30000); // Poll every 5 seconds

        // Cleanup interval after 5 minutes (maximum generation time)
        setTimeout(() => {
          clearInterval(pollInterval);
        }, 300000);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your study material. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="px-2 mt-10">
      <h2 className="font-bold text-2xl">Your Study Material</h2>
      <div className="mt-4 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {courseList.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
