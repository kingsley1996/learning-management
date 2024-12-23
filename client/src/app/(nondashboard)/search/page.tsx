"use client";

import Loading from "@/components/Loading";
import { useEnrollFreeCourseMutation, useGetCoursesQuery } from "@/state/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/CourseCardSearch";
import SelectedCourse from "./SelectedCourse";
import { useUser } from "@clerk/nextjs";

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();
  const { user } = useUser();
  const [enrollFreeCourse] = useEnrollFreeCourseMutation();

  useEffect(() => {
    if (courses) {
      if (id) {
        const course = courses.find((c) => c.courseId === id);
        setSelectedCourse(course || courses[0]);
      } else {
        setSelectedCourse(courses[0]);
      }
    }
  }, [courses, id]);

  if (isLoading) return <Loading />;
  if (isError || !courses) return <div>Failed to fetch courses</div>;

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`, {
      scroll: false,
    });
  };

  const handleEnrollNow = async (course: Course) => {
    const data = {
      userId: user?.id,
      courseId: course.courseId,
    };
    if (course.isFreeCourse) {
      try {
        const res = await enrollFreeCourse(data);
        if (res.error) throw res.error;
        if (
          course.sections &&
          course.sections.length > 0 &&
          course.sections[0].chapters.length > 0
        ) {
          const firstChapter = course.sections[0].chapters[0];
          router.push(
            `/user/courses/${course.courseId}/chapters/${firstChapter.chapterId}`,
            {
              scroll: false,
            }
          );
        } else {
          router.push(`/user/courses/${course.courseId}`, {
            scroll: false,
          });
        }
      } catch (err) {
        console.log("Error Enroll Course:", err);
      }
    } else {
      router.push(`/checkout?step=1&id=${course.courseId}&showSignUp=false`, {
        scroll: false,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">Danh sách các khóa học hiện có</h1>
      <h2 className="search__subtitle">{courses.length} khóa học hiện có</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__courses-grid"
        >
          {courses.map((course) => (
            <CourseCardSearch
              key={course.courseId}
              course={course}
              userId={user?.id}
              isSelected={selectedCourse?.courseId === course.courseId}
              onClick={() => handleCourseSelect(course)}
            />
          ))}
        </motion.div>

        {selectedCourse && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="search__selected-course"
          >
            <SelectedCourse
              userId={user?.id}
              course={selectedCourse}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;
