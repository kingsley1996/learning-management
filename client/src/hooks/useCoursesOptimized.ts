import { useGetCoursesQuery } from "@/state/api";
import { useMemo } from "react";

export const useCoursesOptimized = (category?: string) => {
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useGetCoursesQuery({ category });

  // Memoize courses để tránh re-render không cần thiết
  const memoizedCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];

    // Sắp xếp courses theo popularity hoặc rating nếu có
    return [...courses].sort((a, b) => {
      // Nếu không có rating, giữ nguyên thứ tự
      return 0;
    });
  }, [courses]);

  // Lấy top courses cho landing page
  const topCourses = useMemo(() => {
    return memoizedCourses.slice(0, 4);
  }, [memoizedCourses]);

  // Lấy courses theo category
  const coursesByCategory = useMemo(() => {
    if (!category || category === "all") return memoizedCourses;
    return memoizedCourses.filter((course) => course.category === category);
  }, [memoizedCourses, category]);

  return {
    courses: memoizedCourses,
    topCourses,
    coursesByCategory,
    isLoading,
    isError,
    error,
    hasCourses: memoizedCourses.length > 0,
    totalCourses: memoizedCourses.length,
  };
};
