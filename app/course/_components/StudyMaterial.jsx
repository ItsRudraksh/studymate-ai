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
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [cardCount, setCardCount] = useState("15");
  const [questionCount, setQuestionCount] = useState("10"); // State for number of quiz questions
  const [courseData, setCourseData] = useState(initialCourseData);
  const { toast } = useToast();

  const { flashcardsState, updateFlashcardsState, quizState, updateQuizState } =
    useCourseContext();

  const isGeneratingFlashcards =
    flashcardsState.isGenerating &&
    flashcardsState.courseId === initialCourseData?.courseId;
  const flashcardsGenerated =
    flashcardsState.isGenerated &&
    flashcardsState.courseId === initialCourseData?.courseId;

  const isGeneratingQuiz =
    quizState.isGenerating &&
    quizState.courseId === initialCourseData?.courseId;
  const quizGenerated =
    quizState.isGenerated && quizState.courseId === initialCourseData?.courseId;

  useEffect(() => {
    setCourseData(initialCourseData);

    if (initialCourseData?.flashcardsGenerated && !flashcardsGenerated) {
      updateFlashcardsState({
        isGenerated: true,
        courseId: initialCourseData.courseId,
      });
    }
    if (initialCourseData?.quizGenerated && !quizGenerated) {
      updateQuizState({
        isGenerated: true,
        courseId: initialCourseData.courseId,
      });
    }
  }, [initialCourseData]);

  const handleGenerateFlashcards = async () => {
    try {
      updateFlashcardsState({
        isGenerating: true,
        isGenerated: false,
        courseId: courseData.courseId,
      });
      setShowFlashcardModal(false);
      toast({
        title: "Generating Flashcards",
        description: "Your flashcards are being generated...",
      });
      const course = courseData;
      await axios.post("/api/generate-studyType-content", {
        chapters: course.courseContent.chapters,
        courseId: course.courseId,
        studyType: "flashcards",
        topic: course.topic,
        difficulty: course.difficulty,
        courseType: course.courseType,
        number: parseInt(cardCount),
      });

      // Start polling for flashcard generation status
      const checkInterval = setInterval(async () => {
        try {
          const response = await axios.get(
            `/api/courses/?courseId=${course.courseId}`
          );
          if (response.data.result?.flashcardsGenerated) {
            clearInterval(checkInterval);
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
          clearInterval(checkInterval); // Stop polling on error
        }
      }, 5000);
    } catch (err) {
      console.error("Error generating flashcards:", err);
      updateFlashcardsState({
        isGenerating: false,
        courseId: courseData.courseId,
      });
      toast({
        title: "Error",
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateQuiz = async () => {
    try {
      updateQuizState({
        isGenerating: true,
        isGenerated: false,
        courseId: courseData.courseId,
      });
      setShowQuizModal(false);
      toast({
        title: "Generating Quiz",
        description: "Your quiz is being generated...",
      });
      const course = courseData;
      await axios.post("/api/generate-studyType-content", {
        chapters: course.courseContent.chapters,
        courseId: course.courseId,
        studyType: "quiz",
        topic: course.topic,
        difficulty: course.difficulty,
        courseType: course.courseType,
        number: parseInt(questionCount),
      });

      // Start polling for quiz generation status
      const checkInterval = setInterval(async () => {
        try {
          const response = await axios.get(
            `/api/courses/?courseId=${course.courseId}`
          );
          if (response.data.result?.quizGenerated) {
            clearInterval(checkInterval);
            updateQuizState({
              isGenerating: false,
              isGenerated: true,
              courseId: course.courseId,
            });
            toast({
              title: "Quiz Generated",
              description: "Your quiz is ready to use!",
            });
          }
        } catch (err) {
          console.error("Error checking quiz status:", err);
          clearInterval(checkInterval); // Stop polling on error
        }
      }, 5000);
    } catch (err) {
      console.error("Error generating quiz:", err);
      updateQuizState({
        isGenerating: false,
        courseId: courseData.courseId,
      });
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Study Material</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            {!flashcardsGenerated &&
            !courseData?.flashcardsGenerated &&
            !isGeneratingFlashcards ? (
              <Button
                className="w-full"
                onClick={() => setShowFlashcardModal(true)}>
                Generate
              </Button>
            ) : (
              <Link href={`/course/${courseData?.courseId}/flashcards`}>
                <Button
                  className="w-full"
                  disabled={isGeneratingFlashcards}>
                  {isGeneratingFlashcards ? (
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
            <p className="text-sm text-gray-500 mb-4">
              Test your knowledge with a quiz
            </p>
            {!quizGenerated &&
            !courseData?.quizGenerated &&
            !isGeneratingQuiz ? (
              <Button
                className="w-full"
                onClick={() => setShowQuizModal(true)}>
                Generate
              </Button>
            ) : (
              <Link href={`/course/${courseData?.courseId}/quiz`}>
                <Button
                  className="w-full"
                  disabled={isGeneratingQuiz}>
                  {isGeneratingQuiz ? (
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

        {/* Question/Answer Card */}
        {/* <Card>
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
        </Card> */}
      </div>

      {/* Flashcards Generation Modal */}
      <Dialog
        open={showFlashcardModal}
        onOpenChange={setShowFlashcardModal}>
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
                  <SelectItem value="30">30 cards</SelectItem>
                  <SelectItem value="35">35 cards</SelectItem>
                  <SelectItem value="40">40 cards</SelectItem>
                  <SelectItem value="45">45 cards</SelectItem>
                  <SelectItem value="50">50 cards</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleGenerateFlashcards}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quiz Generation Modal */}
      <Dialog
        open={showQuizModal}
        onOpenChange={setShowQuizModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Quiz</DialogTitle>
            <DialogDescription>
              Choose how many questions you want for your quiz.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="numberOfQuestions"
                className="text-right">
                Number of questions
              </Label>
              <Select
                value={questionCount}
                onValueChange={setQuestionCount}
                className="col-span-3">
                <SelectTrigger id="numberOfQuestions">
                  <SelectValue placeholder="Select number of questions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 questions</SelectItem>
                  <SelectItem value="10">10 questions</SelectItem>
                  <SelectItem value="15">15 questions</SelectItem>
                  <SelectItem value="20">20 questions</SelectItem>
                  <SelectItem value="25">25 questions</SelectItem>
                  <SelectItem value="30">30 questions</SelectItem>
                  <SelectItem value="35">35 questions</SelectItem>
                  <SelectItem value="40">40 questions</SelectItem>
                  <SelectItem value="45">45 questions</SelectItem>
                  <SelectItem value="50">50 questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleGenerateQuiz}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
