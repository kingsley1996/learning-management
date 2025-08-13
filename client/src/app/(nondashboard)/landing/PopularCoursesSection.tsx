import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Course } from "@/types/course";

const CourseCardSearch = dynamic(
  () => import("@/components/CourseCardSearch"),
  {
    loading: () => (
      <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
    ),
    ssr: false,
  }
);

interface PopularCoursesSectionProps {
  courses: any[];
  handleCourseClick: (courseId: string) => void;
  isLoading: boolean;
}

const PopularCoursesSection: React.FC<PopularCoursesSectionProps> = ({
  courses,
  handleCourseClick,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="w-[95%] md:w-[85%] m-auto py-16">
        <div className="w-1/3 h-10 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse mb-12 mx-auto" />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0 md:pl-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse border border-[#ffffff1d] backdrop-blur p-4"
            >
              <div className="h-52 bg-gray-700/50 rounded-lg mb-4" />
              <div className="space-y-4">
                <div className="h-6 bg-gray-700/50 rounded-lg w-3/4" />
                <div className="h-4 bg-gray-700/50 rounded-lg w-1/2" />
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-8 bg-gray-700/50 rounded-full" />
                  <div className="h-8 w-8 bg-gray-700/50 rounded-full" />
                  <div className="h-8 w-8 bg-gray-700/50 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3, once: true }}
    >
      <div className="w-[95%] md:w-[85%] m-auto">
        <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 !text-3xl md:!text-5xl">
          <span className="text-gradient">Khoá Học</span> Phổ Biến
        </h1>
        <p className="text-[16px] font-Poppins relative text-center py-3">
          <span className="dot"></span> Cung cấp những kỹ năng cần thiết cho
          công việc lập trình của bạn
        </p>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0 md:pl-5">
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCoursesSection;
