"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChapterSidebar } from "./_components/ChapterSidebar";
import { ChapterContent } from "./_components/ChapterContent";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

function NotesLoadingSkeleton() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Skeleton */}
      <div className="w-[240px] border-r p-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-10 w-full"
            />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-6 md:ml-[240px] overflow-x-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-4 w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function NotesPage() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    fetchNotes();
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`/api/courses/?courseId=${courseId}`);
      setCourseData(res.data.result);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/notes?courseId=${courseId}`);
      setNotes(response.data.notes);
      // Set first chapter as active by default
      if (response.data.notes.length > 0) {
        setActiveChapter(response.data.notes[0]);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    {
      label: courseData?.topic || "Course",
      href: `/course/${courseId}`,
    },
    {
      label: "Notes",
      href: `/course/${courseId}/notes`,
    },
  ];

  if (loading) {
    return <NotesLoadingSkeleton />;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No notes available for this course yet.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ChapterSidebar
        notes={notes}
        activeChapter={activeChapter}
        setActiveChapter={setActiveChapter}
      />
      <main className="flex-1 p-6 md:ml-[240px] overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <BreadcrumbNav items={breadcrumbItems} />
          <ChapterContent chapter={activeChapter} />
        </div>
      </main>
    </div>
  );
}
