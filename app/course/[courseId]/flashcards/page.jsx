"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

// Add some CSS for the flashcard flip animation
const styles = {
  flashcardContainer: `
    perspective: 1000px;
    width: 100%;
    max-width: 600px;
    aspect-ratio: 3/2;
    margin: 0 auto;
  `,
  flashcard: `
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.8s;
  `,
  flashcardFlipped: `
    transform: rotateY(180deg);
  `,
  cardFace: `
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  `,
  cardFront: `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  `,
  cardBack: `
    background: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);
    color: #333;
    transform: rotateY(180deg);
  `,
};

function FlashcardsLoadingSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Flashcard Skeleton */}
      <div className="w-full aspect-[3/2] max-w-xl mx-auto">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      {/* Controls Skeleton */}
      <div className="flex justify-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cardCount, setCardCount] = useState("15");
  const { toast } = useToast();

  // Use the shared context for flashcard generation state
  const { flashcardsState, updateFlashcardsState } = useCourseContext();
  const isGenerating =
    flashcardsState.isGenerating && flashcardsState.courseId === courseId;
  const isGenerated =
    flashcardsState.isGenerated && flashcardsState.courseId === courseId;

  useEffect(() => {
    fetchCourse();
    fetchFlashcards();
  }, [courseId, isGenerated]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`/api/courses/?courseId=${courseId}`);
      setCourseData(res.data.result);

      // Update context state based on course data
      if (res.data.result?.flashcardsGenerated && !isGenerated) {
        updateFlashcardsState({
          isGenerated: true,
          courseId,
        });
      }

      // If we're in a generating state but not reflected in the context, update it
      if (!res.data.result?.flashcardsGenerated && !isGenerating) {
        // Check if we're in the middle of generation
        const studyTypeRes = await axios.get(
          `/api/studyType?courseId=${courseId}&studyType=flashcards`
        );

        // If we have a record in studyType but flashcardsGenerated is false, we're generating
        if (
          studyTypeRes.data.studyType &&
          !res.data.result?.flashcardsGenerated
        ) {
          updateFlashcardsState({
            isGenerating: true,
            courseId,
          });

          // Start checking for completion
          startGenerationCheck();
        }
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  const startGenerationCheck = () => {
    const checkInterval = setInterval(async () => {
      try {
        const res = await axios.get(`/api/courses/?courseId=${courseId}`);
        if (res.data.result?.flashcardsGenerated) {
          clearInterval(checkInterval);
          updateFlashcardsState({
            isGenerating: false,
            isGenerated: true,
            courseId,
          });
          fetchFlashcards();
          toast({
            title: "Flashcards Generated",
            description: "Your flashcards are now ready to use!",
          });
        }
      } catch (err) {
        console.error("Error checking generation status:", err);
      }
    }, 5000);
  };

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/studyType?courseId=${courseId}&studyType=flashcards`
      );

      if (response.data.studyType && response.data.studyType.flashcardContent) {
        setFlashcards(response.data.studyType.flashcardContent);
      } else {
        setFlashcards([]);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching flashcards:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateFlashcards = async () => {
    try {
      // Update context state for all components
      updateFlashcardsState({
        isGenerating: true,
        isGenerated: false,
        courseId,
      });

      setShowModal(false);

      toast({
        title: "Generating Flashcards",
        description: "This may take a minute or two. Please wait...",
      });

      // Get the course details
      const courseRes = await axios.get(`/api/courses/?courseId=${courseId}`);
      const course = courseRes.data.result;

      // Generate flashcards
      await axios.post("/api/generate-studyType-content", {
        chapters: course.courseContent.chapters,
        courseId: courseId,
        studyType: "flashcards",
        topic: course.topic,
        difficulty: course.difficulty,
        courseType: course.courseType,
        number: parseInt(cardCount),
      });

      // Start checking for generation completion
      startGenerationCheck();
    } catch (err) {
      setError(err.message);
      console.error("Error generating flashcards:", err);

      // Reset generation state on error
      updateFlashcardsState({
        isGenerating: false,
        courseId,
      });

      toast({
        title: "Error",
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextCard = () => {
    setFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to the first card
      setCurrentIndex(0);
    }
  };

  const prevCard = () => {
    setFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop to the last card
      setCurrentIndex(flashcards.length - 1);
    }
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  const breadcrumbItems = [
    {
      label: courseData?.courseContent?.courseTitle || "Course",
      href: `/course/${courseId}`,
    },
    {
      label: "Flashcards",
      href: `/course/${courseId}/flashcards`,
    },
  ];

  if (loading && !isGenerating) {
    return <FlashcardsLoadingSkeleton />;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (isGenerating) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <BreadcrumbNav items={breadcrumbItems} />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Generating Flashcards</h2>
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="h-8 w-8 animate-spin mr-3" />
            <p className="text-gray-600">
              This may take a minute or two. Please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <BreadcrumbNav items={breadcrumbItems} />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No Flashcards Available</h2>
          <p className="text-gray-600 mb-6">
            Generate flashcards for this course to start studying.
          </p>
          <Button
            onClick={() => setShowModal(true)}
            disabled={isGenerating}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-2 hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-indigo-500/25">
            Generate Flashcards
          </Button>

          {/* Enhanced Dialog with better full text display */}
          <Dialog
            open={showModal}
            onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-[425px] p-6 max-h-[90vh] overflow-y-auto border border-zinc-700 bg-zinc-900/90 backdrop-blur-sm">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-500">
                  Generate Flashcards
                </DialogTitle>
                <DialogDescription className="text-sm mt-2 text-left text-zinc-400">
                  Choose how many flashcards you want to generate for this
                  course.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="numberOfCards"
                    className="text-right whitespace-nowrap">
                    Number of cards
                  </Label>
                  <div className="col-span-3">
                    <Select
                      value={cardCount}
                      onValueChange={setCardCount}>
                      <SelectTrigger
                        id="numberOfCards"
                        className="w-full bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select number of cards" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="5">5 cards</SelectItem>
                        <SelectItem value="10">10 cards</SelectItem>
                        <SelectItem value="15">15 cards</SelectItem>
                        <SelectItem value="20">20 cards</SelectItem>
                        <SelectItem value="25">25 cards</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  onClick={generateFlashcards}
                  className="w-full sm:w-auto px-8 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25">
                  Generate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Flashcards</h2>
        <p className="text-gray-600 mb-2">
          Card {currentIndex + 1} of {flashcards.length}
        </p>

        <AnimatePresence mode="wait">
          <div className="my-6 flex justify-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[600px] aspect-[3/2]">
              <div className="perspective-1000 w-full h-full mx-auto">
                <div
                  className={`relative w-full h-full cursor-pointer transition-transform duration-800 transform-style-preserve-3d ${
                    flipped ? "rotate-y-180" : ""
                  }`}
                  onClick={toggleFlip}>
                  <div className="absolute w-full h-full backface-hidden rounded-xl flex items-center justify-center p-8 shadow-lg flashcard-front">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-xl font-bold">
                      {flashcards[currentIndex]?.front}
                    </motion.h3>
                  </div>
                  <div className="absolute w-full h-full backface-hidden rounded-xl flex items-center justify-center p-8 shadow-lg flashcard-back">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-lg">
                      {flashcards[currentIndex]?.back}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <Button
              onClick={prevCard}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full shadow-md border border-indigo-500/30 hover:bg-indigo-500/10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button
              onClick={toggleFlip}
              className="px-8 py-2 shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
              Flip Card
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <Button
              onClick={nextCard}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full shadow-md border border-indigo-500/30 hover:bg-indigo-500/10">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
