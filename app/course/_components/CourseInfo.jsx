import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function CourseInfo({ courseData }) {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg px-3 mb-2 sm:mb-0">
          📝
        </div>
        <div className="w-full">
          <CardTitle className="capitalize text-base sm:text-lg">
            {courseData?.topic || "Loading..."}
          </CardTitle>
          <p className="text-xs sm:text-sm text-gray-500 leading-[1.5] mt-2">
            {courseData?.courseContent?.courseSummary ||
              "Loading course summary..."}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}
