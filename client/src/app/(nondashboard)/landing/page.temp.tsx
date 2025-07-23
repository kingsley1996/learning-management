"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useGetCoursesQuery } from "@/state/api";
import { useCarousel } from "@/hooks/useCarousel";
import dynamic from "next/dynamic";

// Dynamic imports with loading states and preload hints
const LoadingSkeleton = dynamic(() => import("@/components/LoadingSkeleton"), {
  loading: () => <div className="animate-pulse" />,
  ssr: true,
});

const CourseCardSearch = dynamic(() => import("@/components/CourseCardSearch"), {
  loading: () => (
    <div className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
  ),
  ssr: false,
});

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading } = useGetCoursesQuery({});
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<LoadingSkeleton />}>
        {isLoading || isTransitioning ? (
          <LoadingSkeleton />
        ) : (
          <main className="landing-content">
            {/* Hero Section */}
            <section className="relative py-12 px-4">
              <div className="mx-auto max-w-screen-xl text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white sm:text-5xl md:text-6xl">
                  Khóa Học Lập Trình Web Fullstack 1-1
                </h1>
                <p className="mb-8 text-lg text-gray-400">
                  Học lập trình một cách hiệu quả với phương pháp 1-1 cùng mentor có kinh nghiệm
                </p>
                <div className="flex justify-center items-center mt-8">
                  <Image
                    src="/hero-image.jpg"
                    alt="Hero"
                    width={1200}
                    height={600}
                    priority
                    className="rounded-lg shadow-xl"
                    quality={90}
                  />
                </div>
              </div>
            </section>

            {/* Course Section */}
            <section className="py-12 px-4">
              <div className="mx-auto max-w-screen-xl">
                <Suspense 
                  fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[300px] bg-gray-800 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  }
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses?.map((course) => (
                      <CourseCardSearch
                        key={course.id}
                        course={course}
                        onClick={() => handleCourseClick(course.id)}
                      />
                    ))}
                  </div>
                </Suspense>
              </div>
            </section>
          </main>
        )}
      </Suspense>
    </div>
  );
};

export default Landing;
