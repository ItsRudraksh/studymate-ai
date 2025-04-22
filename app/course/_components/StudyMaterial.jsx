import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCourseContext } from "@/app/context/CourseContext";

export function StudyMaterial({ courseData: initialCourseData }) {
  const [showModal, setShowModal] = useState(false);
  const [cardCount, setCardCount] = useState("15");
  const [courseData, setCourseData] = useState(initialCourseData);
  const { toast } = useToast();

  // Use the shared context for flashcard generation state
  const { flashcardsState, updateFlashcardsState } = useCourseContext();
  const isGenerating =
    flashcardsState.isGenerating &&
    flashcardsState.courseId === initialCourseData?.courseId;
  const isGenerated =
    flashcardsState.isGenerated &&
    flashcardsState.courseId === initialCourseData?.courseId;

  // When courseData prop changes, update local state
  useEffect(() => {
    setCourseData(initialCourseData);

    // Check if flashcards are already generated for this course
    if (initialCourseData?.flashcardsGenerated && !isGenerated) {
      updateFlashcardsState({
        isGenerated: true,
        courseId: initialCourseData.courseId,
      });
    }
  }, [initialCourseData]);

  const handleGenerateFlashcards = async () => {
    try {
      // Update context state for all components
      updateFlashcardsState({
        isGenerating: true,
        isGenerated: false,
        courseId: courseData.courseId,
      });

      setShowModal(false);

      toast({
        title: "Generating Flashcards",
        description: "Your flashcards are being generated...",
      });

      // Get the course details
      const course = courseData;

      // Generate flashcards
      await axios.post("/api/generate-studyType-content", {
        chapters: course.courseContent.chapters,
        courseId: course.courseId,
        studyType: "flashcards",
        topic: course.topic,
        difficulty: course.difficulty,
        courseType: course.courseType,
        number: parseInt(cardCount),
      });

      // Set a timeout to check if flashcards are ready
      setTimeout(async () => {
        try {
          const res = await axios.get(
            `/api/courses/?courseId=${course.courseId}`
          );

          if (res.data.result?.flashcardsGenerated) {
            // Update context state once flashcards are generated
            updateFlashcardsState({
              isGenerating: false,
              isGenerated: true,
              courseId: course.courseId,
            });

            toast({
              title: "Flashcards Generated",
              description: "Your flashcards are ready to use!",
            });
          } else {
            // Start regular checks if not ready yet
            const checkInterval = setInterval(async () => {
              try {
                const response = await axios.get(
                  `/api/courses/?courseId=${course.courseId}`
                );

                if (response.data.result?.flashcardsGenerated) {
                  clearInterval(checkInterval);

                  // Update context state once flashcards are generated
                  updateFlashcardsState({
                    isGenerating: false,
                    isGenerated: true,
                    courseId: course.courseId,
                  });

                  toast({
                    title: "Flashcards Generated",
                    description: "Your flashcards are ready to use!",
                  });
                }
              } catch (err) {
                console.error("Error checking flashcard status:", err);
              }
            }, 5000);
          }
        } catch (err) {
          console.error("Error checking initial flashcard status:", err);
        }
      }, 5000);
    } catch (err) {
      console.error("Error generating flashcards:", err);

      // Reset generating state on error
      updateFlashcardsState({
        isGenerating: false,
        courseId: course.courseId,
      });

      toast({
        title: "Error",
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive",
      });
    }
  };

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
            <Link href={`/course/${courseData?.courseId}/notes`}>
              <Button className="w-full">
                {courseData?.status.includes("Generated") ? "View" : "Generate"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Flashcards Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">🎴</div>
            <h3 className="font-semibold">Flashcards</h3>
            <p className="text-sm text-gray-500 mb-4">
              Flashcards for quick revision
            </p>
            {!isGenerated &&
            !courseData?.flashcardsGenerated &&
            !isGenerating ? (
              <Button
                className="w-full"
                onClick={() => setShowModal(true)}>
                Generate
              </Button>
            ) : (
              <Link href={`/course/${courseData?.courseId}/flashcards`}>
                <Button
                  className="w-full"
                  disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "View"
                  )}
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Quiz Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">📝</div>
            <h3 className="font-semibold">Quiz</h3>
            <Button
              disabled={true}
              variant="outline"
              className="w-full mt-4">
              Generate (Add in next Phase)
            </Button>
          </CardContent>
        </Card>

        {/* Question/Answer Card */}
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-4">❓</div>
            <h3 className="font-semibold">Question/Answer</h3>
            <Button
              disabled={true}
              variant="outline"
              className="w-full mt-4">
              Generate (Add in next Phase)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Flashcards Generation Modal */}
      <Dialog
        open={showModal}
        onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Flashcards</DialogTitle>
            <DialogDescription>
              Choose how many flashcards you want to generate for this course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="numberOfCards"
                className="text-right">
                Number of cards
              </Label>
              <Select
                value={cardCount}
                onValueChange={setCardCount}
                className="col-span-3">
                <SelectTrigger id="numberOfCards">
                  <SelectValue placeholder="Select number of cards" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 cards</SelectItem>
                  <SelectItem value="10">10 cards</SelectItem>
                  <SelectItem value="15">15 cards</SelectItem>
                  <SelectItem value="20">20 cards</SelectItem>
                  <SelectItem value="25">25 cards</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleGenerateFlashcards}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
