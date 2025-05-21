"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourseInfo } from "../_components/CourseInfo";
import { StudyMaterial } from "../_components/StudyMaterial";
import { Chapters } from "../_components/Chapters";
import { BreadcrumbNav } from "@/components/Breadcrumb";

function CoursePage() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const res = await axios.get(`/api/courses/?courseId=${courseId}`);
      setCourseData(res.data.result);
      console.log(res.data.result);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const breadcrumbItems = [
    {
      label: courseData?.courseContent?.courseTitle || "Course",
      href: `/course/${courseId}`,
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-bold">Your Course</h1>
      <CourseInfo courseData={courseData} />
      <StudyMaterial courseData={courseData} />
      <Chapters courseData={courseData} />
    </div>
  );
}

export default CoursePage;
