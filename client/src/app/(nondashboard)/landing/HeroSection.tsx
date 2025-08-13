import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
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
          </figure>
        </div>
      </section>
    </motion.div>
  );
};

export default HeroSection;
