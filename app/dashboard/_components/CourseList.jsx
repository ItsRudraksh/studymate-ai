import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

function CourseCardSkeleton() {
  return (
    <div>
      <div className="h-56 rounded-lg border p-4 space-y-4">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-2 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
    </div>
  );
}

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      getCourseList();
    }
  }, [user]);

  const getCourseList = async () => {
    try {
      setLoading(true);
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
        }, 30000);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-2 mt-10">
      <h2 className="font-bold text-2xl">Your Study Material</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <AnimatePresence>
          {loading
            ? Array(3)
                .fill(null)
                .map((_, index) => <CourseCardSkeleton key={index} />)
            : courseList.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CourseList;
