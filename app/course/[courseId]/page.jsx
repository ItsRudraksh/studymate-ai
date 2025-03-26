"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourseInfo } from "../_components/CourseInfo";
import { StudyMaterial } from "../_components/StudyMaterial";
import { Chapters } from "../_components/Chapters";

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
      console.log(courseData);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Your Course</h1>
      <CourseInfo courseData={courseData} />
      <StudyMaterial courseData={courseData} />
      <Chapters courseData={courseData} />
    </div>
  );
}

export default CoursePage;
