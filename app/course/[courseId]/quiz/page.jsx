"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCourseContext } from "@/app/context/CourseContext";
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Or your preferred theme for dark mode

function QuizLoadingSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-10 w-1/2" /> {/* Title Skeleton */}
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" /> {/* Question Skeleton */}
          </CardHeader>
          <CardContent className="space-y-3">
            {[...Array(4)].map((_, j) => (
              <div
                key={j}
                className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />{" "}
                {/* Radio Skeleton */}
                <Skeleton className="h-5 w-5/6" /> {/* Option Skeleton */}
              </div>
            ))}
            <Skeleton className="h-10 w-24 mt-4" /> {/* Button Skeleton */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function QuizPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [questionCount, setQuestionCount] = useState("10"); // Default number of questions

  const { toast } = useToast();
  const { quizState, updateQuizState } = useCourseContext();

  const allQuestionsAnswered =
    quizData &&
    quizData.length > 0 &&
    Object.keys(userAnswers).length === quizData.length;

  const isGeneratingQuiz =
    quizState.isGenerating && quizState.courseId === courseId;
  const isQuizGenerated =
    quizState.isGenerated && quizState.courseId === courseId;

  const fetchCourseDetails = useCallback(async () => {
    try {
      const res = await axios.get(`/api/courses/?courseId=${courseId}`);
      setCourseDetails(res.data.result);
      if (res.data.result?.quizGenerated && !isQuizGenerated) {
        updateQuizState({ isGenerated: true, courseId });
      }
    } catch (err) {
      console.error("Error fetching course details:", err);
      // setError("Failed to load course details.");
    }
  }, [courseId, isQuizGenerated, updateQuizState]);

  const fetchQuiz = useCallback(async () => {
    if (!courseDetails?.quizGenerated && !isQuizGenerated) {
      // If not generated, don't attempt to fetch, rely on generation flow
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `/api/studyType?courseId=${courseId}&studyType=quiz`
      );
      if (response.data.studyType && response.data.studyType.quizContent) {
        setQuizData(response.data.studyType.quizContent);
      } else {
        setQuizData([]); // Set to empty array if no content, to show "Generate"
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError("Failed to load quiz content. Please try generating it.");
      setQuizData([]);
    } finally {
      setLoading(false);
    }
  }, [courseId, courseDetails?.quizGenerated, isQuizGenerated]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  useEffect(() => {
    // Fetch quiz only if course details are loaded and indicate quiz is generated or context says so
    if (courseDetails || isQuizGenerated) {
      fetchQuiz();
    }
  }, [courseDetails, fetchQuiz, isQuizGenerated]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
    setSubmitted(false); // Allow re-submission or show updated feedback instantly if desired
  };

  const handleClearAnswer = (questionIndex) => {
    setUserAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionIndex];
      return newAnswers;
    });
  };

  const handleSubmitQuiz = () => {
    if (!allQuestionsAnswered) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "default", // Or "warning" if you add such a variant to your toast component
      });
      return;
    }

    let calculatedScore = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
    toast({
      title: "Quiz Submitted!",
      description: `You scored ${calculatedScore} out of ${quizData.length}.`,
    });
  };

  const startQuizGenerationCheck = useCallback(() => {
    const checkInterval = setInterval(async () => {
      try {
        const res = await axios.get(`/api/courses/?courseId=${courseId}`);
        if (res.data.result?.quizGenerated) {
          clearInterval(checkInterval);
          updateQuizState({ isGenerating: false, isGenerated: true, courseId });
          fetchQuiz(); // Fetch the newly generated quiz
          toast({
            title: "Quiz Generated!",
            description: "Your quiz is ready to take.",
          });
        }
      } catch (err) {
        console.error("Error checking quiz generation status:", err);
        // Optionally stop interval on error or let it continue
      }
    }, 5000); // Check every 5 seconds
    return () => clearInterval(checkInterval); // Cleanup on unmount
  }, [courseId, fetchQuiz, updateQuizState, toast]);

  const handleGenerateQuiz = async () => {
    try {
      updateQuizState({ isGenerating: true, isGenerated: false, courseId });
      setShowGenerationModal(false);
      toast({
        title: "Generating Quiz",
        description: "This may take a minute or two. Please wait...",
      });

      await axios.post("/api/generate-studyType-content", {
        chapters: courseDetails.courseContent.chapters,
        courseId: courseId,
        studyType: "quiz",
        topic: courseDetails.topic,
        difficulty: courseDetails.difficulty,
        courseType: courseDetails.courseType,
        number: parseInt(questionCount),
      });
      startQuizGenerationCheck();
    } catch (err) {
      console.error("Error generating quiz:", err);
      updateQuizState({ isGenerating: false, courseId });
      toast({
        title: "Error Generating Quiz",
        description: err.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isGeneratingQuiz) {
      const cleanup = startQuizGenerationCheck();
      return cleanup;
    }
  }, [isGeneratingQuiz, startQuizGenerationCheck]);

  const breadcrumbItems = [
    {
      label: courseDetails?.courseContent?.courseTitle || "Course",
      href: `/course/${courseId}`,
    },
    { label: "Quiz", href: `/course/${courseId}/quiz` },
  ];

  if (loading && !isGeneratingQuiz && !(quizData && quizData.length > 0)) {
    return <QuizLoadingSkeleton />;
  }

  if (isGeneratingQuiz) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <BreadcrumbNav items={breadcrumbItems} />
        <h2 className="text-2xl font-bold my-8">Generating Quiz...</h2>
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600" />
        <p className="text-gray-600 mt-4">
          Please wait, this might take a moment.
        </p>
      </div>
    );
  }

  if (!quizData || quizData.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <BreadcrumbNav items={breadcrumbItems} />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Quiz Not Available</h2>
          <p className="text-gray-600 mb-6">
            There\'s no quiz generated for this course yet.
          </p>
          <Button
            onClick={() => setShowGenerationModal(true)}
            disabled={isGeneratingQuiz}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg">
            {isGeneratingQuiz ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Quiz"
            )}
          </Button>
        </div>
        <Dialog
          open={showGenerationModal}
          onOpenChange={setShowGenerationModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate Quiz</DialogTitle>
              <DialogDescription>
                Select the number of questions for your quiz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="questionCount"
                  className="text-right">
                  Questions
                </Label>
                <Select
                  value={questionCount}
                  onValueChange={setQuestionCount}>
                  <SelectTrigger
                    id="questionCount"
                    className="col-span-3">
                    <SelectValue placeholder="Number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((num) => (
                      <SelectItem
                        key={num}
                        value={String(num)}>
                        {num} questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleGenerateQuiz}
                disabled={isGeneratingQuiz}>
                {isGeneratingQuiz ? "Generating..." : "Generate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <BreadcrumbNav items={breadcrumbItems} />
        <div className="text-center py-12 text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <Button
            onClick={() => setShowGenerationModal(true)}
            disabled={isGeneratingQuiz}
            className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg">
            Try Generating Again
          </Button>
        </div>
        <Dialog
          open={showGenerationModal}
          onOpenChange={setShowGenerationModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate Quiz</DialogTitle>
              <DialogDescription>
                Select the number of questions for your quiz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="questionCount"
                  className="text-right">
                  Questions
                </Label>
                <Select
                  value={questionCount}
                  onValueChange={setQuestionCount}>
                  <SelectTrigger
                    id="questionCount"
                    className="col-span-3">
                    <SelectValue placeholder="Number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((num) => (
                      <SelectItem
                        key={num}
                        value={String(num)}>
                        {num} questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleGenerateQuiz}
                disabled={isGeneratingQuiz}>
                {isGeneratingQuiz ? "Generating..." : "Generate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-3xl font-bold my-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
        {courseDetails?.courseContent?.courseTitle || "Quiz"}
      </h1>

      {quizData.map((question, qIndex) => (
        <Card
          key={qIndex}
          className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg">Question {qIndex + 1}</CardTitle>
            <div className="text-md pt-2 prose dark:prose-invert max-w-none prose-pre:bg-[#0d1117] prose-pre:p-4 prose-pre:rounded-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}>
                {question.question}
              </ReactMarkdown>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={userAnswers[qIndex] || ""}
              onValueChange={(value) => handleAnswerChange(qIndex, value)}
              className="space-y-3">
              {question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className={`flex items-center space-x-3 p-3 rounded-md border transition-all duration-200 ease-in-out
                    text-gray-700 dark:text-gray-300
                    ${
                      submitted && option === question.correctAnswer
                        ? "bg-green-100 border-green-400 text-green-800 dark:bg-green-700 dark:border-green-500 dark:text-green-100"
                        : ""
                    }
                    ${
                      submitted &&
                      userAnswers[qIndex] === option &&
                      option !== question.correctAnswer
                        ? "bg-red-100 border-red-400 text-red-800 dark:bg-red-700 dark:border-red-500 dark:text-red-100"
                        : ""
                    }
                    ${
                      !submitted && userAnswers[qIndex] === option
                        ? "bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-700 dark:border-indigo-500 dark:text-indigo-100"
                        : "border-gray-300 dark:border-gray-700"
                    }
                  `}>
                  <RadioGroupItem
                    value={option}
                    id={`q${qIndex}-o${oIndex}`}
                    disabled={submitted}
                    className="border-gray-400 dark:border-gray-600 data-[state=checked]:bg-indigo-600 dark:data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-600 dark:data-[state=checked]:border-indigo-500"
                  />
                  <Label
                    htmlFor={`q${qIndex}-o${oIndex}`}
                    className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {!submitted && userAnswers[qIndex] && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleClearAnswer(qIndex)}
                className="mt-3 text-xs text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900 dark:hover:text-red-300 flex items-center">
                <X className="h-3 w-3 mr-1" />
                Clear Answer
              </Button>
            )}
            {submitted && (
              <div className="mt-4 p-3 rounded-md bg-gray-800 border border-gray-700">
                <p className="text-sm font-semibold text-gray-200">
                  Explanation:
                </p>
                <div className="text-sm text-gray-400 prose dark:prose-invert max-w-none prose-p:mt-0 prose-p:mb-2 prose-pre:bg-[#0d1117] prose-pre:p-2 prose-pre:rounded-md prose-pre:text-sm">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}>
                    {question.explanation}
                  </ReactMarkdown>
                </div>
                {userAnswers[qIndex] !== question.correctAnswer && (
                  <p className="text-sm text-green-400 mt-1">
                    Correct Answer: {question.correctAnswer}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {!submitted && quizData && quizData.length > 0 && (
        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmitQuiz}
            size="lg"
            className={`px-10 py-6 text-lg bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90`}>
            Submit Quiz
          </Button>
        </div>
      )}

      {submitted && (
        <Card className="mt-8 text-center p-6 shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
          <CardTitle className="text-2xl mb-3 text-gray-800 dark:text-gray-200">
            Quiz Completed!
          </CardTitle>
          <CardDescription className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            You scored{" "}
            <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
              {score}
            </span>{" "}
            out of{" "}
            <span className="font-bold text-xl text-gray-800 dark:text-gray-200">
              {quizData.length}
            </span>
            .
          </CardDescription>
          <Button
            onClick={() => {
              setUserAnswers({});
              setSubmitted(false);
              setScore(0);
              toast({
                title: "Quiz Reset",
                description: "You can take the quiz again.",
              });
            }}
            variant="outline"
            className="border-indigo-500 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-gray-700 dark:hover:text-indigo-300">
            Take Again
          </Button>
        </Card>
      )}
    </div>
  );
}
