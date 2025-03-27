import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "@/hooks/useInView";

function ChapterCard({ chapter, index }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}>
      <Card>
        <CardContent className="pt-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold mb-2 sm:mb-0">
              {index + 1}
            </div>
            <div className="text-center sm:text-left w-full">
              <h3 className="font-semibold text-base sm:text-lg">
                {chapter.chapterTitle}
              </h3>
              <p className="text-sm sm:text-sm text-gray-500 mt-1">
                {chapter.chapterSummary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Chapters({ courseData }) {
  const chapters = courseData?.courseContent?.chapters || [];

  return (
    <div
      id="chapters"
      className="px-4 sm:px-0">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Chapters</h2>
      <div className="grid gap-3 sm:gap-4">
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={index}
            chapter={chapter}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
