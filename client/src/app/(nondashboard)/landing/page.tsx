"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCoursesOptimized } from "@/hooks/useCoursesOptimized";

// Dynamic imports for performance optimization
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  loading: () => <div className="h-8 bg-gray-800 rounded animate-pulse" />,
});

const SparkleEffect = dynamic(() => import("@/components/SparkleEffect"), {
  ssr: false,
});

// Lazy load heavy components
const HeroSection = React.lazy(() => import("./HeroSection"));
const PreviewSection = React.lazy(() => import("./PreviewSection"));
const TrustedSection = React.lazy(() => import("./TrustedSection"));
const PopularCoursesSection = React.lazy(
  () => import("./PopularCoursesSection")
);
const StudentFeedbackSection = React.lazy(
  () => import("./StudentFeedbackSection")
);

// Optimized skeleton components - chỉ cho courses section
const CoursesSkeleton = () => (
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

const Landing = () => {
  const router = useRouter();
  const { topCourses, isLoading, isError } = useCoursesOptimized();

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="landing"
    >
      {/* Hero Section - Load immediately */}
      <ErrorBoundary>
        <Suspense fallback={<div className="h-screen" />}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      {/* Preview Section - Lazy load */}
      <ErrorBoundary>
        <Suspense fallback={<div className="h-96" />}>
          <PreviewSection />
        </Suspense>
      </ErrorBoundary>

      {/* Trusted Section - Lazy load */}
      <ErrorBoundary>
        <Suspense fallback={<div className="h-32" />}>
          <TrustedSection />
        </Suspense>
      </ErrorBoundary>

      {/* Popular Courses Section - Lazy load với skeleton riêng biệt */}
      <ErrorBoundary>
        <Suspense fallback={<CoursesSkeleton />}>
          <PopularCoursesSection
            courses={topCourses}
            handleCourseClick={handleCourseClick}
            isLoading={isLoading}
          />
        </Suspense>
      </ErrorBoundary>

      {/* Student Feedback Section - Lazy load */}
      <ErrorBoundary>
        <Suspense fallback={<div className="h-96" />}>
          <StudentFeedbackSection />
        </Suspense>
      </ErrorBoundary>
    </motion.div>
  );
};

export default Landing;
