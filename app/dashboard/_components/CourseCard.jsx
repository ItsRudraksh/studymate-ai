import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

function CourseCard({ course }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 0.1 }}>
      <Card className="h-60 rounded-lg shadow-md flex flex-col">
        <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
          <Book className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          <h2 className="text-lg font-semibold line-clamp-2">
            {course.courseContent.courseTitle}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 text-ellipsis flex-grow">
            {course.courseContent.courseSummary}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Link href={`/course/${course.courseId}`}>
            <Button
              variant="outline"
              disabled={course.status === "Generating"}
              className="min-w-[100px]">
              {course.status === "Generating" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                "Start"
              )}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default CourseCard;
