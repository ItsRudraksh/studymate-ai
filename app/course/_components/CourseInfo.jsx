import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function CourseInfo({ courseData }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
          📝
        </div>
        <div>
          <CardTitle className="capitalize">
            {courseData?.topic || "Loading..."}
          </CardTitle>
          <p className="text-sm text-gray-500 leading-[1.5] mt-3">
            {courseData?.courseContent?.courseSummary ||
              "Loading course summary..."}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}
