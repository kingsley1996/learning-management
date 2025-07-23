"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { courseBenefits, learningPath } from "@/constants/course-data";
import CountdownTimer from "@/components/CountdownTimer";

const GradientBorder = ({ color }: { color: string }) => {
  return (
    <div
      className={`absolute inset-0 rounded-lg bg-gradient-to-r from-${color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    />
  );
};

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="text-center"
        >
          <h1 className="max-w-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text px-4 text-center text-3xl font-bold leading-tight text-transparent transition-opacity sm:text-4xl md:text-5xl lg:text-6xl">
            Khóa Học Lập Trình Web Fullstack 1-1
          </h1>
          <div className="mt-4 sm:mt-5 inline-flex flex-col items-center justify-center gap-2 sm:gap-3">
            <p className="max-w-3xl text-balance px-4 text-center font-semibold text-blue-200 text-base sm:text-lg md:text-xl">
              Học theo lộ trình cá nhân hóa, thực hành trực tiếp cùng
            </p>
            <div className="inline-flex items-center font-semibold">
              <Image
                alt="Samuel Dang"
                width={40}
                height={40}
                priority
                quality={90}
                className="mr-1.5 h-8 w-8 rounded-full bg-gray-800 sm:h-10 sm:w-10"
                src="/cws.jpeg"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkLzYxMC8vMTQ3ODk3NDFANzs6Pz0/OkNCRkpGQEZFRTpFTz5KRUХ/2wBDARUXFx4aHjshISE7TzUtNU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTUХ/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <span className="text-white">Samuel Dang</span>
            </div>
          </div>

          <div className="not-prose my-5 mx-auto mt-10 max-w-screen-xl sm:relative sm:my-10">
            <ul className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4">
              <li className="flex h-10 items-center justify-center rounded border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-blue-500/20 px-5 text-center text-sm font-medium text-blue-200 hover:border-blue-400/40 hover:from-blue-500/20 hover:to-blue-500/30 transition-all duration-200 sm:h-12 sm:px-7 sm:text-lg">
                Next.js App Router
              </li>
              <li className="flex h-10 items-center justify-center rounded border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-purple-500/20 px-5 text-center text-sm font-medium text-purple-200 hover:border-purple-400/40 hover:from-purple-500/20 hover:to-purple-500/30 transition-all duration-200 sm:h-12 sm:px-7 sm:text-lg">
                React 19
              </li>
              <li className="flex h-10 items-center justify-center rounded border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-indigo-500/20 px-5 text-center text-sm font-medium text-indigo-200 hover:border-indigo-400/40 hover:from-indigo-500/20 hover:to-indigo-500/30 transition-all duration-200 sm:h-12 sm:px-7 sm:text-lg">
                TypeScript
              </li>
              <li className="flex h-10 items-center justify-center rounded border border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-500/20 px-5 text-center text-sm font-medium text-cyan-200 hover:border-cyan-400/40 hover:from-cyan-500/20 hover:to-cyan-500/30 transition-all duration-200 sm:h-12 sm:px-7 sm:text-lg">
                TailwindCSS
              </li>
            </ul>
          </div>

          <div className="mt-10 mb-10 grid w-full grid-cols-1 items-start justify-center gap-5 px-4 sm:grid-cols-2 sm:gap-8 sm:px-0 md:max-w-4xl md:gap-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white/5 p-6 text-center"
            >
              <Image
                alt="5 out of 5 stars"
                width={104}
                height={16}
                loading="eager"
                className="mb-2"
                src="/five-star.webp"
              />
              <p className="text-balance text-sm italic leading-relaxed text-blue-200 sm:text-lg">
                &ldquo;Phương pháp học 1-1 giúp tôi tiến bộ nhanh chóng. Mentor
                hướng dẫn rất tận tâm và chuyên nghiệp&rdquo;
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-white/5 p-6 text-center"
            >
              <Image
                alt="5 out of 5 stars"
                width={104}
                height={16}
                loading="eager"
                className="mb-2"
                src="/five-star.webp"
              />
              <p className="text-balance text-sm italic leading-relaxed text-blue-200 sm:text-lg">
                &ldquo;Từ người mới bắt đầu, giờ tôi đã có thể làm việc như một
                Fullstack Developer thực thụ&rdquo;
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl grid gap-6 sm:gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-8"
          >
            <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
              Ai có thể tham gia?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>Người mới bắt đầu, chưa có kiến thức về lập trình</span>
              </li>
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>
                  Sinh viên CNTT muốn có định hướng nghề nghiệp rõ ràng
                </span>
              </li>
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>Người đi làm muốn chuyển ngành sang lập trình</span>
              </li>
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>Lập trình viên muốn nâng cao kỹ năng Fullstack</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-8"
          >
            <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
              Học xong làm việc ở đâu?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>
                  Apply vào tất cả công ty tuyển dụng Full-Stack, Back-End JS
                  hoặc Front-End Dev
                </span>
              </li>
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>Startup công nghệ</span>
              </li>
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>Freelancer nhận dự án từ khách hàng quốc tế</span>
              </li>
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>
                  Có thể apply ngay vào Fresher, Junior với mức lương khởi điểm
                  từ <b>9 - 16tr/tháng</b>
                </span>
              </li>
              <li className="flex items-start text-gray-300">
                <svg
                  className="mr-3 h-6 w-6 flex-shrink-0 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span>Tự khởi nghiệp với sản phẩm công nghệ riêng</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Bạn Sẽ Được Tiếp Cận Các Công Nghệ Mới Nhất
          </h2>
          <p className="text-gray-300 mb-12">
            Stack công nghệ hiện đại được cập nhật liên tục theo xu hướng thị
            trường
          </p>

          <div className="relative">
            {/* First row - moving left */}
            <div className="flex space-x-4 sm:space-x-8 mb-6 sm:mb-8 animate-scroll-left">
              <div className="flex space-x-4 sm:space-x-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-2 sm:p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/javascript.svg"
                    alt="Javascript"
                    width={36}
                    height={36}
                    className="invert sm:w-12 sm:h-12"
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/next.svg"
                    alt="Next.js"
                    width={48}
                    height={48}
                    className="invert"
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image src="/react.svg" alt="React" width={48} height={48} />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/typescript.svg"
                    alt="TypeScript"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/tailwind.svg"
                    alt="TailwindCSS"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/nodejs.svg"
                    alt="Node.js"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-8">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/javascript.svg"
                    alt="Javascript"
                    width={48}
                    height={48}
                    className="invert"
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/next.svg"
                    alt="Next.js"
                    width={48}
                    height={48}
                    className="invert"
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image src="/react.svg" alt="React" width={48} height={48} />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/typescript.svg"
                    alt="TypeScript"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/tailwind.svg"
                    alt="TailwindCSS"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/nodejs.svg"
                    alt="Node.js"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </div>

            {/* Second row - moving right */}
            <div className="flex space-x-8 animate-scroll-right">
              <div className="flex space-x-8">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/python.svg"
                    alt="Python"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/postgresql.svg"
                    alt="PostgreSQL"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image src="/git-scm.svg" alt="Git" width={48} height={48} />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/docker.svg"
                    alt="Docker"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/amazon_aws.svg"
                    alt="AWS"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-8">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/python.svg"
                    alt="Python"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/postgresql.svg"
                    alt="PostgreSQL"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image src="/git-scm.svg" alt="Git" width={48} height={48} />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/docker.svg"
                    alt="Docker"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
                  <Image
                    src="/amazon_aws.svg"
                    alt="AWS"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Lộ Trình Học Tập Chi Tiết
          </h2>
          <p className="text-gray-300">
            Được thiết kế để đưa bạn từ người mới bắt đầu đến Fullstack
            Developer chuyên nghiệp
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl relative">
          <div className="absolute left-1/2 top-0 h-full w-px">
            <div className="h-full w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 blur-sm opacity-50" />
          </div>

          {learningPath.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`group relative mb-16 lg:mb-24 ${
                index % 2 === 0 ? "pr-[52%]" : "pl-[52%]"
              }`}
            >
              <div className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 flex items-center">
                {/* Left Connector */}
                {index % 2 === 0 && (
                  <div className="w-6 h-[2px] bg-gradient-to-l from-blue-500/50 to-purple-500/50 mr-2" />
                )}

                {/* Gradient Node */}
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-75" />
                  <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <div className="absolute inset-2 rounded-full bg-black" />
                  <div className="absolute inset-[0.4rem] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>

                {/* Right Connector */}
                {index % 2 === 1 && (
                  <div className="w-6 h-[2px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 ml-2" />
                )}
              </div>

              {/* Content Card */}
              <div
                className={`relative rounded-lg p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-${
                  path.color
                }-500/10 to-${path.color}-500/5 border border-${
                  path.color
                }-500/20 group-hover:border-${
                  path.color
                }-500/30 transition-all ${index % 2 === 0 ? "mr-4 sm:mr-8" : "ml-4 sm:ml-8"}`}
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div>
                    <h3 className="mb-2 text-lg sm:text-xl font-bold text-white lg:text-2xl">
                      {path.title}
                    </h3>
                    <p className={`text-${path.color}-400 mb-4`}>
                      {path.duration}
                    </p>
                    <p className="mb-4 text-gray-300">{path.description}</p>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {path.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center text-gray-400"
                      >
                        <svg
                          className={`mr-2 h-5 w-5 text-${path.color}-500`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <GradientBorder color={path.color} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

<section className="mb-20 px-4">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 text-center backdrop-blur-sm border border-gray-700/50 relative overflow-hidden"
  >
    {/* Floating Sparkles */}
    <div className="absolute inset-0">
      <div className="absolute top-12 left-8 w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-12 right-8 w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
      <div className="absolute top-1/2 right-12 w-2 h-2 bg-pink-500 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
    </div>

    <div className="relative">
      <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 mb-4">
        Ưu đãi giới hạn
      </span>
      
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Đăng Ký Sớm - Tiết Kiệm 50%
      </h3>

      <h4 className="text-xl text-green-500 mb-4">Trở Thành Lập Trình Viên Trong 3 Tháng Chỉ Với</h4>

      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl sm:text-2xl text-gray-400 line-through">4.999.999₫</span>
          <span className="text-3xl sm:text-4xl font-bold text-white">1.999.999₫</span>
        </div>
        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
          Tiết kiệm 3.000.000₫
        </span>

        {/* Slot Progress */}
        <div className="w-full max-w-md">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Đã đăng ký: 23 học viên</span>
            <span>Còn lại: 7 slots</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-[77%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            <span className="text-pink-400 font-medium">30 slots</span> được mở trong đợt này
          </p>
        </div>
      </div>

      <CountdownTimer targetDate={new Date('2025-08-01')} />

      <ul className="mb-8 space-y-3">
        <li className="flex items-center justify-center text-gray-300">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Học 1-1 với mentor chuyên nghiệp
        </li>
        <li className="flex items-center justify-center text-gray-300">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Lộ trình học tập cá nhân hóa
        </li>
        <li className="flex items-center justify-center text-gray-300">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Hỗ trợ định hướng nghề nghiệp
        </li>
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 font-semibold text-white text-lg shadow-lg hover:shadow-xl transition-all"
      >
        Đăng Ký Ngay
      </motion.button>
      
      <p className="mt-4 text-sm text-gray-400">
        * Ưu đãi có thể kết thúc sớm khi hết slot
      </p>
    </div>
  </motion.div>
</section>
    </main>
  );
}
