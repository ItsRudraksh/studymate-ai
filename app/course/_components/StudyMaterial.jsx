import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function StudyMaterial({ courseData }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Study Material</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Notes/Chapters Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">📚</div>
            <h3 className="font-semibold">Notes / Chapters</h3>
            <p className="text-sm text-gray-500 mb-4">
              Read Notes to prepare for exam
            </p>
            <Link href={"#chapters"}>
              <Button className="w-full">
                {courseData?.status === "Generated" ? "View" : "Generate"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Flashcards Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">🎴</div>
            <h3 className="font-semibold">Flashcards</h3>
            <Button
              variant="outline"
              className="w-full mt-4">
              Generate
            </Button>
          </CardContent>
        </Card>

        {/* Quiz Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">📝</div>
            <h3 className="font-semibold">Quiz</h3>
            <Button
              variant="outline"
              className="w-full mt-4">
              Generate
            </Button>
          </CardContent>
        </Card>

        {/* Question/Answer Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">❓</div>
            <h3 className="font-semibold">Question/Answer</h3>
            <Button
              variant="outline"
              className="w-full mt-4">
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
