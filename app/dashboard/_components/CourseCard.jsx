import React from "react";
import { Card } from "@/components/ui/card";
import { Book, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function CourseCard({ course }) {
  return (
    <div>
      <Card className="h-56 rounded-lg shadow-md">
        <div className="flex flex-col space-y-2 p-4">
          <Book className="h-6 w-6 text-gray-700" />
          <h2 className="text-lg font-semibold">
            {course.courseContent.courseTitle}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
            {course.courseContent.courseSummary}
          </p>
          <Progress
            value={10}
            className="h-2"
          />
          <div className="flex justify-end">
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
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CourseCard;
