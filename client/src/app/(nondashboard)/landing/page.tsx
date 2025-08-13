"use client";

import React, { Suspense } from "react";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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

// Optimized skeleton components
const SkeletonCard = () => (
  <div className="h-[400px] bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse border border-[#ffffff1d] backdrop-blur p-4">
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
);

const LoadingUI = () => (
  <div className="w-full min-h-screen">
    {/* Hero section skeleton */}
    <div className="relative pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="w-3/4 h-12 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse" />
          <div className="w-2/3 h-8 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse" />
          <div className="w-1/2 h-16 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse mt-8" />
          <div className="w-full md:w-3/4 h-[300px] bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse mt-8" />
        </div>
      </div>
    </div>

    {/* Featured courses skeleton */}
    <div className="container mx-auto px-4 py-16">
      <div className="w-1/3 h-10 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse mb-12 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  </div>
);

const Landing = () => {
  const router = useRouter();
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery({});

  // Show skeleton only for initial load, not for data updates
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  // Show skeleton only on initial load
  if (isInitialLoad && isLoading) {
    return <LoadingUI />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="landing"
    >
      {/* Hero Section - Load immediately */}
      <Suspense fallback={<div className="h-screen" />}>
        <HeroSection />
      </Suspense>

      {/* Preview Section - Lazy load */}
      <Suspense fallback={<div className="h-96" />}>
        <PreviewSection />
      </Suspense>

      {/* Trusted Section - Lazy load */}
      <Suspense fallback={<div className="h-32" />}>
        <TrustedSection />
      </Suspense>

      {/* Popular Courses Section - Lazy load */}
      <Suspense fallback={<div className="h-96" />}>
        <PopularCoursesSection
          courses={courses}
          handleCourseClick={handleCourseClick}
          isLoading={isLoading}
        />
      </Suspense>

      {/* Student Feedback Section - Lazy load */}
      <Suspense fallback={<div className="h-96" />}>
        <StudentFeedbackSection />
      </Suspense>
    </motion.div>
  );
};

export default Landing;
