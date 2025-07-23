"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic imports for performance optimization
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  loading: () => <div className="h-8 bg-gray-800 rounded animate-pulse" />
});

const SparkleEffect = dynamic(() => import("@/components/SparkleEffect"), {
  ssr: false
});

const CourseCardSearch = dynamic(() => import("@/components/CourseCardSearch"), {
  loading: () => <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />,
  ssr: false,
});

// Loading UI components
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

const LoadingUI = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero section skeleton */}
      <div className="relative pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="w-3/4 h-12 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse" />
            <div className="w-2/3 h-8 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse" />
            <div className="w-1/2 h-16 bg-[#ffffff3f] bg-opacity-20 rounded-lg animate-pulse mt-8" />
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
};

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  if (isLoading) return <LoadingUI />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing_main-hero"
      >
        {/* SECTION HERO */}
        <section className="bg-white dark:bg-gray-900">
          <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8 lg:px-4">
            <a
              href="https://www.tiktok.com/@codewithsamuel96"
              target="_blank"
              className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-slate-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              role="alert"
            >
              <span className="text-xs bg-slate-950 text-slate-100 rounded-full text-white px-4 py-1.5 mr-3">
                Tiktok
              </span>
              <span className="text-sm font-medium">CodeWithSamuel</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <figure className="flex justify-between relative hero-figure">
              <div>
                <h1 className="font-mono mb-4 text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r text-gradient text-transparent bg-clip-text md:text-5xl lg:text-6xl text-white">
                  Học lập trình cùng Samuel
                </h1>
                <p className="font-sans mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
                  Mình là Samuel, một Web Developer với hơn 5 năm kinh nghiệm.
                  Mình đang trong quá trình xây dựng một nơi để giúp các bạn mới
                  có thể tiếp cận với lập trình một cách dễ dàng và có hệ thống.
                </p>
                <div className="flex flex-col mb-8 lg:mb-8 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/hoc-lap-trinh-1-1"
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900"
                    scroll={false}
                  >
                    Xem thêm
                    <svg
                      className="ml-2 -mr-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                  <Link
                    href="/user/courses"
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-100 rounded-lg border focus:ring-4 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-800"
                    scroll={false}
                  >
                    <svg
                      className="mr-2 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Học Ngay
                  </Link>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="935"
                height="701"
                viewBox="0 0 935 701"
                id="avatar-shapes"
                data-shape="true"
              >
                <path
                  fill="none"
                  stroke="#ccf381"
                  strokeMiterlimit="50"
                  strokeWidth="2"
                  d="M165.648 352.811v0l15.343 16.136v0l15.343-16.136v0l15.341 16.136v0l15.343-16.136v0l15.343 16.136v0l15.343-16.136v0l15.344 16.136v0l15.345-16.136v0"
                ></path>
                <path
                  fill="#ccf381"
                  d="M112.476 1.58a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM131.444 1.58a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 1.58a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM169.38 1.58a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM188.348 1.58a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM207.315 1.58a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM226.283 1.58a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM245.252 1.58a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM264.22 1.58a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM283.188 1.58a1.5 1.5 0 11-3.002 0 1.5 1.5 0 013.002 0zM302.155 1.58a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 1.58a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM112.476 20.804a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM131.444 20.804a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM150.412 20.804a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM169.38 20.804a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM188.348 20.804a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM207.315 20.804a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM226.283 20.804a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM245.252 20.804a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM264.22 20.804a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM283.188 20.804a1.5 1.5 0 11-3.002-.001 1.5 1.5 0 013.002 0zM302.155 20.804a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM321.123 20.804a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM112.476 40.026a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM131.444 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM169.38 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM188.348 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM207.315 40.026a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM226.283 40.026a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM245.252 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM264.22 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM283.188 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM302.155 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 40.026a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM112.476 59.25a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM131.444 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM169.38 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM188.348 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM207.315 59.25a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM226.283 59.25a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM245.252 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM264.22 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM283.188 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM302.155 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 59.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM112.476 78.473a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM131.444 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM169.38 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM188.348 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM207.315 78.473a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM226.283 78.473a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM245.252 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM264.22 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM283.188 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM302.155 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 78.473a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM112.476 97.696a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM131.444 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM169.38 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM188.348 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM207.315 97.696a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM226.283 97.696a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM245.252 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM264.22 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM283.188 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM302.155 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 97.696a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM112.476 116.92a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM131.444 116.92a1.5 1.5 0 11-3-.002 1.5 1.5 0 013 .001zM150.412 116.92a1.5 1.5 0 11-3.001-.002 1.5 1.5 0 013.001.001zM169.38 116.92a1.5 1.5 0 11-3.001-.002 1.5 1.5 0 013 .001zM188.348 116.92a1.5 1.5 0 11-3.001-.002 1.5 1.5 0 013 .001zM207.315 116.92a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM226.283 116.92a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM245.252 116.92a1.5 1.5 0 11-3.001-.002 1.5 1.5 0 013.001.001zM264.22 116.92a1.5 1.5 0 11-3.001-.002 1.5 1.5 0 013 .001zM283.188 116.92a1.5 1.5 0 11-3.002-.002 1.5 1.5 0 013.002.001zM302.155 116.92a1.5 1.5 0 11-3-.002 1.5 1.5 0 013 .001zM321.123 116.92a1.5 1.5 0 11-3.001-.002 1.5 1.5 0 013.001.001zM112.476 136.142a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM131.444 136.142a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 136.142a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM169.38 136.142a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM188.348 136.142a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM207.315 136.142a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM226.283 136.142a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM245.252 136.142a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM264.22 136.142a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM283.188 136.142a1.5 1.5 0 11-3.002 0 1.5 1.5 0 013.002 0zM302.155 136.142a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 136.142a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM112.476 155.365a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM131.444 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM169.38 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM188.348 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM207.315 155.365a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM226.283 155.365a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM245.252 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM264.22 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM283.188 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM302.155 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 155.365a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM112.476 174.588a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM131.444 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM169.38 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM188.348 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM207.315 174.588a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM226.283 174.588a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM245.252 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM264.22 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM283.188 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM302.155 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 174.588a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM112.476 193.811a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM131.444 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM150.412 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM169.38 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM188.348 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM207.315 193.811a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM226.283 193.811a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM245.252 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM264.22 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM283.188 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM302.155 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM321.123 193.811a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                ></path>
                <path
                  fill="#4831d4"
                  d="M692.477 418.551a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM711.444 418.551a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM730.412 418.551a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM749.38 418.551a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM768.348 418.551a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM787.315 418.551a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 418.551a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 418.551a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM844.22 418.551a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM863.188 418.551a1.5 1.5 0 11-3.002 0 1.5 1.5 0 013.001 0zM882.155 418.551a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM901.123 418.551a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM692.477 437.774a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM711.444 437.774a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 .001zM730.412 437.774a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001.001zM749.38 437.774a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM768.348 437.774a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM787.315 437.774a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 437.774a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 437.774a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001.001zM844.22 437.774a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM863.188 437.774a1.5 1.5 0 11-3.002-.001 1.5 1.5 0 013.001.001zM882.155 437.774a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 .001zM901.123 437.774a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001.001zM692.477 456.998a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM711.444 456.998a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM730.412 456.998a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM749.38 456.998a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM768.348 456.998a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM787.315 456.998a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 456.998a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 456.998a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM844.22 456.998a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM863.188 456.998a1.5 1.5 0 11-3.002-.001 1.5 1.5 0 013.001 0zM882.155 456.998a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM901.123 456.998a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM692.477 476.22a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM711.444 476.22a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM730.412 476.22a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM749.38 476.22a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM768.348 476.22a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM787.315 476.22a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 476.22a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 476.22a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM844.22 476.22a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013 0zM863.188 476.22a1.5 1.5 0 11-3.002 0 1.5 1.5 0 013.001 0zM882.155 476.22a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM901.123 476.22a1.5 1.5 0 11-3.001 0 1.5 1.5 0 013.001 0zM692.477 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM711.444 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM730.412 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM749.38 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM768.348 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM787.315 495.443a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM806.283 495.443a1.5 1.5 0 11-2.998.001 1.5 1.5 0 012.998-.001zM825.252 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM844.22 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM863.188 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM882.155 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM901.123 495.443a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM692.477 514.667a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM711.444 514.667a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM730.412 514.667a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM749.38 514.667a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM768.348 514.667a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM787.315 514.667a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 514.667a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 514.667a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM844.22 514.667a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM863.188 514.667a1.5 1.5 0 11-3.002-.001 1.5 1.5 0 013.001 0zM882.155 514.667a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM901.123 514.667a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM692.477 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM711.444 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM730.412 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM749.38 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM768.348 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM787.315 533.89a1.5 1.5 0 11-2.998 0 1.5 1.5 0 012.998 0zM806.283 533.89a1.5 1.5 0 11-2.998 0 1.5 1.5 0 012.998 0zM825.252 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM844.22 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM863.188 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM882.155 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM901.123 533.89a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM692.477 553.113a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM711.444 553.113a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 .001zM730.412 553.113a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001.001zM749.38 553.113a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM768.348 553.113a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM787.315 553.113a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 553.113a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 553.113a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001.001zM844.22 553.113a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 .001zM863.188 553.113a1.5 1.5 0 11-3.002-.001 1.5 1.5 0 013.001.001zM882.155 553.113a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 .001zM901.123 553.113a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001.001zM692.477 572.336a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM711.444 572.336a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM730.412 572.336a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM749.38 572.336a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM768.348 572.336a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM787.315 572.336a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 572.336a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 572.336a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM844.22 572.336a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM863.188 572.336a1.5 1.5 0 11-3.002-.001 1.5 1.5 0 013.001 0zM882.155 572.336a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM901.123 572.336a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM692.477 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM711.444 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM730.412 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM749.38 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM768.348 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM787.315 591.558a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM806.283 591.558a1.5 1.5 0 11-2.998.002 1.5 1.5 0 012.998-.002zM825.252 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM844.22 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM863.188 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM882.155 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM901.123 591.558a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM692.477 610.782a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM711.444 610.782a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM730.412 610.782a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM749.38 610.782a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM768.348 610.782a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM787.315 610.782a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM806.283 610.782a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM825.252 610.782a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0zM844.22 610.782a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013 0zM863.188 610.782a1.5 1.5 0 11-3.002-.001 1.5 1.5 0 013.001 0zM882.155 610.782a1.5 1.5 0 11-3-.001 1.5 1.5 0 013 0zM901.123 610.782a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001 0z"
                ></path>
                <path
                  fill="none"
                  stroke="#4831d4"
                  strokeMiterlimit="50"
                  strokeWidth="2"
                  d="M846.646 332.048v0l22.258.562v0l-.56-22.26v0l22.258.56v0l-.56-22.258v0l22.259.56v0l-.56-22.257v0l22.26.559v0l-.56-22.26v0"
                ></path>
                <path
                  fill="none"
                  stroke="#ccf381"
                  strokeMiterlimit="50"
                  strokeWidth="2"
                  d="M2.114 541.705v0l-.56 22.258v0l22.258-.561v0l-.56 22.259v0l22.258-.56v0l-.56 22.258v0l22.258-.56v0l-.559 22.26v0l22.26-.56v0"
                ></path>
              </svg>
            </figure>
          </div>
        </section>
      </motion.div>
      {/* SECTION PREVIEW */}
      <div className="relative z-1">
        <div className="w-full flex flex-col items-center mt-16 mb-10 relative">
          <Image
            src="/creative-hand.webp"
            alt="hand"
            width={400}
            height={400}
            className="absolute 2xl:w-[400px] md:hidden xl:block xl:w-[290px] xl:h-[290px] 2xl:h-[400px] left-0 top-[50%] md:top-[31%] 2xl:top-[34%] z-10 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[300px] md:h-[300px]"
            priority
          />
          <div className="absolute md:top-16 2xl:top-24 top-0 md:w-[80%] 2xl:w-[60%] m-auto z-20 w-[95%]">
            <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 !font-DM_Sans leading-[30px] md:!text-[4xl] md:!leading-[50px] xl:!text-5xl xl:!leading-[60px]">
              CodeWithSamuel đồng hành cùng bạn trong quá trình học lập trình.
              Hãy cùng tìm hiểu
              <span className="text-gradient"> cách để sử dụng </span>
              trang web một cách hiệu quả nhé.
            </h1>
          </div>
          <div className="!mt-[9rem] md:!mt-0 w-[300px] h-[300px] flex items-center justify-center sm:w-[400px] sm:h-[400px] md:w-[700px] md:h-[700px] xl:w-[800px] xl:h-[800px] 2xl:w-[900px] 2xl:h-[900px] bg-transparent border-[#3f3f47] border-[1px] rounded-full relative">
            <span className="tp-circle-1"></span>
            <span className="tp-circle-2"></span>
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
              <div className="md:w-[60px] md:h-[60px] w-[55px] h-[55px] cursor-pointer bg-transparent flex items-center justify-center border border-[#000] border-white rounded-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="35"
                  width="35"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Play_1">
                    <path d="M6.562,21.94a2.5,2.5,0,0,1-2.5-2.5V4.56A2.5,2.5,0,0,1,7.978,2.5L18.855,9.939a2.5,2.5,0,0,1,0,4.12L7.977,21.5A2.5,2.5,0,0,1,6.562,21.94Zm0-18.884a1.494,1.494,0,0,0-.7.177,1.477,1.477,0,0,0-.8,1.327V19.439a1.5,1.5,0,0,0,2.35,1.235l10.877-7.44a1.5,1.5,0,0,0,0-2.471L7.413,3.326A1.491,1.491,0,0,0,6.564,3.056Z"></path>
                  </g>
                </svg>
              </div>
              <Link href="/hoc-lap-trinh-1-1" className="text-[24px] font-bold text-purple-600 font-Poppins pt-2 md:pl-3 cursor-pointer md:!text-[18px]">
                Lộ trình học lập trình 1-1
              </Link>
            </div>
          </div>
          <div className="hidden md:grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:absolute bottom-28">
            <button
              className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent"
              type="button"
              role="button"
            >
              <div className="relative flex p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased bg-[#0d0da5] bg-opacity-[.7] shadow w-full">
                <div className="flex items-center p-8">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-7xl icon-gradient text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 19a6 6 0 0 0-12 0"></path>
                    <circle cx="8" cy="9" r="4"></circle>
                    <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"></path>
                  </svg>
                  <div className="pl-3">
                    <h5 className="text-[25px] font-[500] font-Poppins text-center py-2 text-white">
                      500+
                    </h5>
                    <span className="text-[16px] font-Poppins text-white">
                      Thành Viên Đăng Ký
                    </span>
                  </div>
                </div>
              </div>
            </button>
            <button
              className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent"
              type="button"
              role="button"
            >
              <div className="relative flex p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased bg-[#460c7f] bg-opacity-[.7] shadow w-full">
                <div className="flex items-center p-8">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-7xl text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
                    ></path>
                  </svg>
                  <div className="pl-3">
                    <h5 className="text-[25px] font-[500] font-Poppins text-center py-2 text-white">
                      4.9/5
                    </h5>
                    <span className="text-[16px] font-Poppins text-white">
                      Đánh Giá Học Viên
                    </span>
                  </div>
                </div>
              </div>
            </button>
            <button
              className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-small rounded-large cursor-pointer transition-transform-background motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent"
              type="button"
              role="button"
            >
              <div className="relative flex p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased bg-[rgb(54,186,126)] shadow w-full">
                <div className="flex items-center p-8">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-7xl text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Globe">
                      <path d="M14.645,2.428a8.1,8.1,0,0,0-1.61-.3,9.332,9.332,0,0,0-3.6.28l-.07.02a9.928,9.928,0,0,0,.01,19.15,9.091,9.091,0,0,0,2.36.34,1.274,1.274,0,0,0,.27.02,9.65,9.65,0,0,0,2.63-.36,9.931,9.931,0,0,0,.01-19.15Zm-.27.96a8.943,8.943,0,0,1,5.84,5.11h-4.26a13.778,13.778,0,0,0-2.74-5.35A8.254,8.254,0,0,1,14.375,3.388Zm-2.37-.09a12.78,12.78,0,0,1,2.91,5.2H9.075A12.545,12.545,0,0,1,12.005,3.3Zm3.16,6.2a13.193,13.193,0,0,1,0,5.01H8.845a12.185,12.185,0,0,1-.25-2.5,12.353,12.353,0,0,1,.25-2.51Zm-5.6-6.09.07-.02a9.152,9.152,0,0,1,1.16-.23A13.618,13.618,0,0,0,8.045,8.5H3.8A9,9,0,0,1,9.565,3.408Zm-6.5,8.6a8.71,8.71,0,0,1,.37-2.51h4.39a13.95,13.95,0,0,0-.23,2.51,13.757,13.757,0,0,0,.23,2.5H3.435A8.591,8.591,0,0,1,3.065,12.008Zm6.57,8.61a8.9,8.9,0,0,1-5.84-5.11h4.24a13.632,13.632,0,0,0,2.77,5.35A8.1,8.1,0,0,1,9.635,20.618Zm-.56-5.11h5.84a12.638,12.638,0,0,1-2.91,5.21A12.872,12.872,0,0,1,9.075,15.508Zm5.3,5.11a11.551,11.551,0,0,1-1.17.24,13.8,13.8,0,0,0,2.75-5.35h4.26A8.924,8.924,0,0,1,14.375,20.618Zm1.8-6.11a13.611,13.611,0,0,0,0-5.01h4.39a8.379,8.379,0,0,1,.37,2.51,8.687,8.687,0,0,1-.36,2.5Z"></path>
                    </g>
                  </svg>
                  <div className="pl-3">
                    <h5 className="text-[25px] font-[500] font-Poppins text-center py-2 text-white">
                      1k+
                    </h5>
                    <span className="text-[16px] font-Poppins text-white">
                      Lượt Truy Cập Hàng Ngày
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* SECTION TRUSTED */}
      <div className="mb-10">
        <br />
        <br />
        <h5 className="text-[25px] font-[500] font-Poppins text-center py-2 !text-3xl md:!text-5xl capitalize mb-[-3%]">
          <span className="text-gradient">CodeWithSamuel</span> trusted by
        </h5>
        <div className="w-[80%] sm:w-[70%] m-auto block">
          <div className="rfm-marquee-container w-full flex">
            <div className="rfm-marquee">
              <div className="rfm-initial-child-container">
                <div className="rfm-child">
                  <Image
                    src="/brand/clerk-logo.svg"
                    alt="Clerk Logo"
                    width={220}
                    height={220}
                    className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                  />
                </div>
                <div className="rfm-child">
                  <Image
                    src="/brand/upstash-logo.svg"
                    alt="Upstash Logo"
                    width={220}
                    height={220}
                    className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                  />
                </div>
                <div className="rfm-child">
                  <Image
                    src="/brand/one-entry.svg"
                    alt="One Entry Logo"
                    width={220}
                    height={220}
                    className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
            </div>
            <div className="rfm-marquee">
              <div className="rfm-initial-child-container">
                <div className="rfm-child">
                  <Image
                    src="/brand/clerk-logo.svg"
                    alt="Clerk Logo"
                    width={220}
                    height={220}
                    className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                  />
                </div>
                <div className="rfm-child">
                  <Image
                    src="/brand/upstash-logo.svg"
                    alt="Upstash Logo"
                    width={220}
                    height={220}
                    className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                  />
                </div>
                <div className="rfm-child">
                  <Image
                    src="/brand/one-entry.svg"
                    alt="One Entry Logo"
                    width={220}
                    height={220}
                    className="md:mx-8 w-[150px] md:w-[220px] mx-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SECTION POPULAR COURSES */}
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
                  transition={{ duration: 0.5, delay: index * 0.2 }}
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
      {/* SECTION STUDENT'S FEEDBACK */}
      <div>
        <br />
        <br />
        <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 md:!text-5xl !text-3xl">
          Học Viên <span className="text-gradient">Đánh Giá</span>
        </h1>
        <p className="text-[16px] font-Poppins relative text-center py-5">
          <span className="dot"></span> Cùng xem những đánh giá từ học viên nhé
        </p>
        <br />
        <div
          className="max-w-[95%] mx-auto p-4 md:block columns-auto md:columns-3"
          style={{ columnGap: "1rem" }}
        >
          {/* REVIEW 1 */}
          <div className="break-inside-avoid mb-5">
            <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
              <div className="flex w-full">
                <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                  <div className="w-[55px]">
                    <span
                      tabIndex={-1}
                      className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                    >
                      <Image
                        src="/avatar.png"
                        alt="Nguyễn Quang Hùng Avatar"
                        width={56}
                        height={56}
                        className="flex object-cover w-full h-full"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="pl-4">
                      <h5 className="md:text-[20px] mb-2">Nguyễn Quang Hùng</h5>
                      <h6 className="text-[14px] text-[#ffffffab]">
                        Web developer
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </div>
              </div>
              <p className="pt-2 px-2 font-Poppins">
                Cảm ơn bạn vì kênh hướng dẫn lập trình rất bổ ích! Khả năng chia
                nhỏ các chủ đề phức tạp thành những phần dễ hiểu của bạn, cùng
                với việc bao quát nhiều ngôn ngữ lập trình và chủ đề khác nhau,
                thật sự rất ấn tượng. Những ví dụ thực tế và ứng dụng thực tiễn
                mà bạn lồng ghép vào giúp củng cố kiến thức lý thuyết và mang
                lại nhiều góc nhìn giá trị!
              </p>
            </div>
          </div>
          {/* REVIEW 2 */}
          <div className="break-inside-avoid mb-5">
            <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
              <div className="flex w-full">
                <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                  <div className="w-[55px]">
                    <span
                      tabIndex={-1}
                      className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                    >
                      <Image
                        src="/avatar.png"
                        alt="Trần Minh Avatar"
                        width={56}
                        height={56}
                        className="flex object-cover w-full h-full"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="pl-4">
                      <h5 className="md:text-[20px] mb-2">Trần Minh</h5>
                      <h6 className="text-[14px] text-[#ffffffab]">
                        Junior Web Developer
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </div>
              </div>
              <p className="pt-2 px-2 font-Poppins">
                Nội dung của bạn thật sự rất đặc biệt. Điều mà mình thích nhất
                chính là các video đều có thời lượng dài, giúp bạn trình bày mọi
                thứ một cách chi tiết. Nhờ vậy, ngay cả những người ở mức độ mới
                bắt đầu cũng có thể hoàn thành một dự án hoàn chỉnh sau khi xem
                xong. Cảm ơn bạn rất nhiều! Mình rất háo hức chờ đợi những video
                tiếp theo. Hãy tiếp tục công việc tuyệt vời này nhé!
              </p>
            </div>
          </div>
          {/* REVIEW 3 */}
          <div className="break-inside-avoid mb-5">
            <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
              <div className="flex w-full">
                <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                  <div className="w-[55px]">
                    <span
                      tabIndex={-1}
                      className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                    >
                      <Image
                        src="/avatar.png"
                        alt="Joseph Le Avatar"
                        width={56}
                        height={56}
                        className="flex object-cover w-full h-full"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="pl-4">
                      <h5 className="md:text-[20px] mb-2">Joseph Le</h5>
                      <h6 className="text-[14px] text-[#ffffffab]">
                        Full stack web developer
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </div>
              </div>
              <p className="pt-2 px-2 font-Poppins">
                Tham gia ngay CodeWithSamuel! CodeWithSamuel tập trung vào các
                ứng dụng thực tiễn thay vì chỉ giảng dạy lý thuyết về các ngôn
                ngữ lập trình hay framework. Mình đã học một bài hướng dẫn về
                cách tạo một sàn thương mại điện tử bằng React JS, và nó thực sự
                hữu ích trong việc giúp mình hiểu các giai đoạn khác nhau của
                việc hoàn thành một dự án từ đầu đến cuối. Tổng thể, mình rất
                khuyến khích CodeWithSamuel cho bất kỳ ai muốn cải thiện kỹ năng
                lập trình và xây dựng các dự án thực tế. CodeWithSamuel thực sự
                là một nguồn tài nguyên tuyệt vời để giúp bạn nâng tầm kỹ năng
                của mình!
              </p>
            </div>
          </div>
          {/* REVIEW 4 */}
          <div className="break-inside-avoid mb-5">
            <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
              <div className="flex w-full">
                <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                  <div className="w-[55px]">
                    <span
                      tabIndex={-1}
                      className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                    >
                      <Image
                        src="/avatar.png"
                        alt="Danh Meta Avatar"
                        width={56}
                        height={56}
                        className="flex object-cover w-full h-full"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="pl-4">
                      <h5 className="md:text-[20px] mb-2">Danh Meta</h5>
                      <h6 className="text-[14px] text-[#ffffffab]">
                        Full stack web developer
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </div>
              </div>
              <p className="pt-2 px-2 font-Poppins">
                Samuel thực sự là một lập trình viên tốt. Anh ấy có khả năng
                tuyệt vời trong việc giải quyết các lỗi trên website, và kỹ năng
                xử lý vấn đề của anh ấy thì không chê vào đâu được. Hơn thế nữa,
                nội dung trên kênh Tiktok và Youtube của anh ấy luôn đạt chất
                lượng hàng đầu. Mình rất khuyến khích mọi người ủng hộ cộng đồng
                CodeWithSamuel!
              </p>
            </div>
          </div>
          {/* REVIEW 5 */}
          <div className="break-inside-avoid mb-5">
            <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
              <div className="flex w-full">
                <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                  <div className="w-[55px]">
                    <span
                      tabIndex={-1}
                      className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                    >
                      <Image
                        src="/avatar.png"
                        alt="Đặng Phùng Danh Avatar"
                        width={56}
                        height={56}
                        className="flex object-cover w-full h-full"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="pl-4">
                      <h5 className="md:text-[20px] mb-2">Đặng Phùng Danh</h5>
                      <h6 className="text-[14px] text-[#ffffffab]">
                        Founder & CEO
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </div>
              </div>
              <p className="pt-2 px-2 font-Poppins">
                Mình rất trân trọng sự tận tâm, chuyên môn và nhiệt huyết của
                bạn trong việc giảng dạy lập trình. CodeWithSamuel không chỉ
                dừng lại ở việc dạy lý thuyết về ngôn ngữ lập trình và
                framework. Trang web còn cung cấp rất nhiều khóa học liên quan
                đến công nghệ, nhưng khóa học mà mình chọn thực sự khiến mình ấn
                tượng về chi phí và chất lượng. Với danh sách khóa học phong phú
                và đội ngũ giảng viên xuất sắc, CodeWithSamuel chính là nơi lý
                tưởng để bạn mở rộng kiến thức và kỹ năng trong ngành công nghệ.
              </p>
            </div>
          </div>
          {/* REVIEW 6 */}
          <div className="break-inside-avoid mb-5">
            <div className="flex-col relative overflow-hidden text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none w-full my-5 md:my-0 h-min block bg-[#ffffff3f] bg-slate-500 bg-opacity-[0.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
              <div className="flex w-full">
                <div className="flex p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large items-center">
                  <div className="w-[55px]">
                    <span
                      tabIndex={-1}
                      className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-14 h-14 text-small bg-default text-default-foreground rounded-full"
                    >
                      <Image
                        src="/avatar.png"
                        alt="Trần Long IT Avatar"
                        width={56}
                        height={56}
                        className="flex object-cover w-full h-full"
                      />
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="pl-4">
                      <h5 className="md:text-[20px] mb-2">Trần Long IT</h5>
                      <h6 className="text-[14px] text-[#ffffffab]">
                        Computer systems engineering student
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    color="#f6b100"
                    className="mr-2 cursor-pointer"
                    style={{ color: "#f6b100" }}
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </div>
              </div>
              <p className="pt-2 px-2 font-Poppins">
                CodeWithSamuel làm rất tốt trong việc giải thích các khái niệm
                một cách rõ ràng và súc tích, cùng với những ví dụ được chọn lọc
                kỹ lưỡng. Nhìn chung, đây là một nguồn tài liệu quý giá cho bất
                kỳ ai mới bắt đầu học lập trình.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Landing;
