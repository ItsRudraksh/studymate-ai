import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      getCourseList();
    }
  }, [user]);

  // Apply filters whenever courseList, searchQuery, or activeCategory changes
  useEffect(() => {
    filterCourses();
  }, [courseList, searchQuery, activeCategory]);

  // Filter courses based on search query and category
  const filterCourses = () => {
    let filtered = [...courseList];

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (course) =>
          course.courseType?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.courseContent?.courseTitle?.toLowerCase().includes(query) ||
          course.courseContent?.courseSummary?.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(filtered);
  };

  const getCourseList = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      const courses = res.data.result;
      setCourseList(courses);
      setFilteredCourses(courses);

      // Check if any course is still generating
      const generatingCourses = courses.filter(
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
          const updatedCourses = updatedRes.data.result;

          const stillGenerating = updatedCourses.some(
            (course) => course.status === "Generating"
          );
          if (!stillGenerating) {
            clearInterval(pollInterval);
            setCourseList(updatedCourses);
            toast({
              title: "Notes Generated",
              description:
                "Your study material has been generated successfully!",
              duration: 5000,
            });
          } else {
            setCourseList(updatedCourses);
          }
        }, 10000);

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setActiveCategory(value);
  };

  return (
    <div className="px-2 mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="font-bold text-2xl">Your Study Material</h2>

        {/* Search Box */}
        <div className="relative w-full sm:w-80 mt-4 sm:mt-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by title or description..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="mb-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger
            value="all"
            className="text-sm">
            All
          </TabsTrigger>
          <TabsTrigger
            value="coding"
            className="text-sm">
            Coding
          </TabsTrigger>
          <TabsTrigger
            value="exam"
            className="text-sm">
            Exam
          </TabsTrigger>
          <TabsTrigger
            value="job"
            className="text-sm">
            Job
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="text-sm">
            Other
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Results Count */}
      {!loading && (
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredCourses.length} of {courseList.length} courses
        </p>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <AnimatePresence>
          {loading ? (
            Array(3)
              .fill(null)
              .map((_, index) => <CourseCardSkeleton key={index} />)
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}>
                <CourseCard course={course} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                No courses found matching your filters.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CourseList;
