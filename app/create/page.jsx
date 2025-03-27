"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Briefcase, Code, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useUser } from "@clerk/nextjs";
import { BreadcrumbNav } from "@/components/Breadcrumb";

const categories = [
  { id: "exam", label: "Exam", icon: BookOpen },
  { id: "job", label: "Job", icon: Briefcase },
  { id: "coding", label: "Coding", icon: Code },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const difficulties = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

export default function Create() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    content: "",
    difficulty: "",
  });

  const breadcrumbItems = [
    {
      label: "Create",
      href: "/create",
    },
  ];

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleContentChange = (e) => {
    setFormData((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleDifficultySelect = (difficulty) => {
    setFormData((prev) => ({ ...prev, difficulty }));
  };

  const generateOutline = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post("/api/generate-course-outline", {
        category: formData.category,
        content: formData.content,
        difficulty: formData.difficulty,
        courseId: uuid(),
        createdBy: user?.primaryEmailAddress?.emailAddress || "",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Error generating content:",
        error.response?.data || error.message
      );
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && !formData.category) return;
    if (step === 2 && (!formData.content || !formData.difficulty)) return;

    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        <BreadcrumbNav items={breadcrumbItems} />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-2xl p-6 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-blue-500">
                Start Building Your Personal Study Material
              </h1>
              <p className="text-muted-foreground">
                Fill the details in order to generate study material for you
              </p>
            </div>

            {step === 1 ? (
              <div className="space-y-4">
                <h2 className="text-lg">
                  What do you want to create study material for?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.id}
                        variant={
                          formData.category === category.id
                            ? "default"
                            : "outline"
                        }
                        className="h-24 flex-col gap-4"
                        onClick={() => handleCategorySelect(category.id)}>
                        <Icon className="w-6 h-6" />
                        {category.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Enter topic or paste the content
                  </label>
                  <Textarea
                    placeholder="Enter your content here..."
                    className="min-h-[200px]"
                    value={formData.content}
                    onChange={handleContentChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Difficulty Level
                  </label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={handleDifficultySelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem
                          key={difficulty.id}
                          value={difficulty.id}>
                          {difficulty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Review Your Inputs</h2>
                <p>
                  <strong>Category:</strong>{" "}
                  {categories.find((c) => c.id === formData.category)?.label}
                </p>
                <p>
                  <strong>Content:</strong> {formData.content}
                </p>
                <p>
                  <strong>Difficulty:</strong>{" "}
                  {
                    difficulties.find((d) => d.id === formData.difficulty)
                      ?.label
                  }
                </p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrev}>
                  Previous
                </Button>
              )}

              {step < 3 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button
                  onClick={generateOutline}
                  disabled={isGenerating}>
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
