"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { courseBenefits, learningPath } from "@/constants/course-data";
import CountdownTimer from "@/components/CountdownTimer";
import { useEffect, useState } from "react";

// Component hiển thị progress bar của slots
const SlotProgressBar = () => {
  const slotInfo = useSlotCounter();
  
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Đã đăng ký: <span className="text-pink-400 font-medium">{slotInfo.registered} học viên</span></span>
        <span>Còn lại: <span className="text-yellow-400 font-medium">{slotInfo.remaining} slots</span></span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" 
          style={{ width: `${slotInfo.percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
        <p>
          <span className="text-pink-400 font-medium">{slotInfo.total} slots</span> được mở trong đợt này
        </p>
        {slotInfo.remaining < 6 && (
          <p className="text-yellow-400 text-xs animate-pulse">Sắp hết slot!</p>
        )}
      </div>
    </div>
  );
};

// Custom hook hiển thị số slot còn lại và số người đã đăng ký
const useSlotCounter = () => {
  const [slots, setSlots] = useState({
    registered: 23,
    remaining: 7,
    total: 30
  });
  
  useEffect(() => {
    // Random initial remaining slots between 4-8
    const remaining = Math.floor(Math.random() * 5) + 4;
    const total = 30;
    const registered = total - remaining;
    
    setSlots({
      registered,
      remaining,
      total
    });
    
    // Giảm slot còn lại sau một khoảng thời gian ngẫu nhiên
    const timeout = setTimeout(() => {
      if (slots.remaining > 1) {
        setSlots(prev => ({
          ...prev,
          registered: prev.registered + 1,
          remaining: prev.remaining - 1
        }));
      }
    }, Math.random() * 180000 + 60000); // Giảm slot sau 1-4 phút
    
    return () => clearTimeout(timeout);
  }, [slots.remaining]);
  
  return {
    registered: slots.registered,
    remaining: slots.remaining,
    total: slots.total,
    percentage: Math.floor((slots.registered / slots.total) * 100)
  };
};

// Component hiển thị số người xem ngẫu nhiên
const ViewerCounter = () => {
  const [viewers, setViewers] = useState(13);
  
  useEffect(() => {
    // Random initial value between 8-20
    setViewers(Math.floor(Math.random() * 13) + 8);
    
    // Định kỳ thay đổi số người xem với một giá trị nhỏ
    const interval = setInterval(() => {
      setViewers(prev => {
        // Random change between -1 and +2
        const change = Math.floor(Math.random() * 4) - 1;
        // Ensure viewers stays between 8-25
        const newValue = Math.max(8, Math.min(25, prev + change));
        return newValue;
      });
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return <span className="animate-pulse">{viewers} người đang xem</span>;
};

const GradientBorder = ({ color }: { color: string }) => {
  return (
    <div
      className={`absolute inset-0 rounded-lg bg-gradient-to-r from-${color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    />
  );
};

// Hiệu ứng viền gradient chạy
const AnimatedBorder = ({ color, cardIndex }: { color: string, cardIndex: number }) => {
  // Sử dụng object mapping thay vì string interpolation với opacity thấp hơn (30%)
  const gradientClasses: Record<string, string> = {
    'blue': 'absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-border-flow',
    'purple': 'absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-border-flow',
    'pink': 'absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-pink-500/30 to-transparent animate-border-flow',
    'cyan': 'absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-border-flow',
    'green': 'absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-border-flow',
    'amber': 'absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-amber-500/30 to-transparent animate-border-flow',
  };
  
  return (
    <div className={`absolute inset-0 rounded-xl overflow-hidden z-0 card-${cardIndex}`}>
      <div className={gradientClasses[color] || 'absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-border-flow'}></div>
    </div>
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

      {/* Phần Lợi Ích Khi Tham Gia Khóa Học */}
      <section className="px-4 py-10 mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Lợi Ích Khi Tham Gia Khóa Học
          </h2>
          <p className="text-gray-300">
            Những giá trị thiết thực mà bạn sẽ nhận được khi tham gia khóa học 1-1 với mentor
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 group transition-all duration-300"
          >
            <AnimatedBorder color="blue" cardIndex={1} />
            <div className="absolute -right-4 -top-6 text-blue-500/40 font-bold text-[120px] leading-none select-none group-hover:text-blue-500/60 transition-all duration-300">
              1
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Lộ Trình Cá Nhân Hóa
              </h3>
              <p className="text-gray-300">
                Lộ trình học được thiết kế riêng theo khả năng và mục tiêu của bạn, giúp bạn tiến bộ nhanh hơn. Phù hợp với cả những bạn chưa có kinh nghiệm về lập trình.
              </p>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 group transition-all duration-300"
          >
            <AnimatedBorder color="purple" cardIndex={2} />
            <div className="absolute -right-4 -top-6 text-purple-500/40 font-bold text-[120px] leading-none select-none group-hover:text-purple-500/60 transition-all duration-300">
              2
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Học Với Dự Án Thực Tế
              </h3>
              <p className="text-gray-300">
                Xây dựng các dự án thực tế có giá trị thay vì chỉ học lý thuyết. Portfolio của bạn sẽ có những sản phẩm ấn tượng để trình diễn với nhà tuyển dụng.
              </p>
            </div>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-pink-500/10 to-pink-500/5 p-6 group transition-all duration-300"
          >
            <AnimatedBorder color="pink" cardIndex={3} />
            <div className="absolute -right-4 -top-6 text-pink-500/40 font-bold text-[120px] leading-none select-none group-hover:text-pink-500/60 transition-all duration-300">
              3
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Truy cập các khoá học Online
              </h3>
              <p className="text-gray-300">
                Được quyền truy cập sớm vào các khoá học online chất lượng, được dành riêng cho học viên đăng ký. Giúp bạn củng cố kiến thức và mở rộng kỹ năng lập trình một cách linh hoạt.
              </p>
            </div>
          </motion.div>
          
          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-6 group transition-all duration-300"
          >
            <AnimatedBorder color="cyan" cardIndex={4} />
            <div className="absolute -right-4 -top-6 text-cyan-500/40 font-bold text-[120px] leading-none select-none group-hover:text-cyan-500/60 transition-all duration-300">
              4
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Tư Vấn Nghề Nghiệp
              </h3>
              <p className="text-gray-300">
                Nhận được tư vấn về con đường sự nghiệp, cách xây dựng CV, chuẩn bị phỏng vấn và định hướng phát triển kỹ năng phù hợp với mục tiêu công việc.
              </p>
            </div>
          </motion.div>
          
          {/* Card 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-green-500/10 to-green-500/5 p-6 group transition-all duration-300"
          >
            <AnimatedBorder color="green" cardIndex={5} />
            <div className="absolute -right-4 -top-6 text-green-500/40 font-bold text-[120px] leading-none select-none group-hover:text-green-500/60 transition-all duration-300">
              5
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Coding Review Chất Lượng
              </h3>
              <p className="text-gray-300">
                Mã code của bạn sẽ được review kỹ lưỡng, giúp xây dựng thói quen viết code sạch, tối ưu và theo chuẩn ngành từ sớm - kỹ năng quan trọng với mọi developer.
              </p>
            </div>
          </motion.div>
          
          {/* Card 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-6 group transition-all duration-300"
          >
            <AnimatedBorder color="amber" cardIndex={6} />
            <div className="absolute -right-4 -top-6 text-amber-500/40 font-bold text-[120px] leading-none select-none group-hover:text-amber-500/60 transition-all duration-300">
              6
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Giải đáp thắc mắc
              </h3>
              <p className="text-gray-300">
                Trong suốt quá trình học, bạn sẽ được mentor giải đáp mọi thắc mắc về lập trình, công nghệ và định hướng nghề nghiệp. Đảm bảo bạn không bao giờ cảm thấy lạc lõng hay bối rối.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phần đánh giá chi tiết từ học viên */}
      <section className="px-4 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Học Viên Nói Gì Về Khóa Học
          </h2>
          <p className="text-gray-300">
            Trải nghiệm thực tế từ những học viên đã hoàn thành khóa học và đi làm thực tế
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Đánh giá 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6"
            >
              <Image
                src="/avatar.png"
                alt="Rukyono"
                width={64}
                height={64}
                className="rounded-full border-2 border-blue-500/30 mb-4"
              />
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">Rukyono</h3>
                <p className="text-blue-400 text-sm">Junior Frontend Developer</p>
              </div>
              <Image
                alt="5 out of 5 stars"
                width={104}
                height={16}
                className="mb-3"
                src="/five-star.webp"
              />
              <p className="text-gray-300 mb-4">
                &ldquo;Sau 3 tháng học, mình đã có thể phát triển được các ứng dụng web hoàn chỉnh. Mentor hướng dẫn tận tâm, giải đáp mọi thắc mắc kể cả ngoài giờ học. Kiến thức thực tiễn và cập nhật với xu hướng công nghệ.&rdquo;
              </p>
              <p className="text-blue-300 italic text-sm">
                ⟶ Đã apply thành công vào vị trí Frontend Developer với mức lương 14 triệu/tháng
              </p>
            </motion.div>

            {/* Đánh giá 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6"
            >
              <Image
                src="/avatar.png"
                alt="tkanhbeo"
                width={64}
                height={64}
                className="rounded-full border-2 border-purple-500/30 mb-4"
              />
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">tkanhbeo</h3>
                <p className="text-purple-400 text-sm">Fullstack Developer</p>
              </div>
              <Image
                alt="5 out of 5 stars"
                width={104}
                height={16}
                className="mb-3"
                src="/five-star.webp"
              />
              <p className="text-gray-300 mb-4">
                &ldquo;Mình đã thử học ở nhiều nền tảng khác nhau nhưng không đâu hiệu quả bằng học 1-1 với Samuel. Khóa học thiết kế riêng cho mình, giúp mình tiến bộ nhanh hơn hẳn so với tự học. Rất đáng đồng tiền bát gạo!&rdquo;
              </p>
              <p className="text-purple-300 italic text-sm">
                ⟶ Chuyển từ nhân viên marketing sang Fullstack Developer với mức lương tăng gấp đôi
              </p>
            </motion.div>

            {/* Đánh giá 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative overflow-hidden rounded-xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-pink-500/5 p-6"
            >
              <Image
                src="/avatar.png"
                alt="miomio"
                width={64}
                height={64}
                className="rounded-full border-2 border-pink-500/30 mb-4"
              />
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">miomio</h3>
                <p className="text-pink-400 text-sm">Fresher Web Developer</p>
              </div>
              <Image
                alt="5 out of 5 stars"
                width={104}
                height={16}
                className="mb-3"
                src="/five-star.webp"
              />
              <p className="text-gray-300 mb-4">
                &ldquo;Bắt đầu từ con số 0, giờ mình đã tự tin làm việc trong môi trường công nghệ. Aanh Samuel không chỉ dạy code mà còn hướng dẫn cách giao tiếp, làm việc nhóm và cách học tập độc lập sau khóa học.&rdquo;
              </p>
              <p className="text-pink-300 italic text-sm">
                ⟶ Vượt qua phỏng vấn 3 công ty công nghệ hàng đầu Việt Nam
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Phần câu hỏi thường gặp */}
      <section className="px-4 py-10 mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-gray-300">
            Những thắc mắc phổ biến về khóa học Lập trình Web Fullstack 1-1
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {/* FAQ 1 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border border-blue-500/20 bg-blue-500/5 overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-white font-medium">
                  <span>Tôi chưa biết gì về lập trình, có thể tham gia khóa học không?</span>
                  <svg className="h-5 w-5 transform transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-blue-500/20 px-6 py-4">
                  <p className="text-gray-300">
                    Hoàn toàn có thể! Khóa học được thiết kế để phù hợp với cả những người mới bắt đầu. Mentor sẽ xây dựng lộ trình học phù hợp với trình độ của bạn, bắt đầu từ những kiến thức cơ bản nhất và tiến dần đến nâng cao. Bạn chỉ cần có máy tính cá nhân và kết nối internet ổn định là có thể học được.
                  </p>
                </div>
              </details>
            </motion.div>

            {/* FAQ 2 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="rounded-lg border border-purple-500/20 bg-purple-500/5 overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-white font-medium">
                  <span>Lịch học linh hoạt như thế nào?</span>
                  <svg className="h-5 w-5 transform transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-purple-500/20 px-6 py-4">
                  <p className="text-gray-300">
                    Bạn có thể lựa chọn thời gian học linh hoạt phù hợp với lịch trình cá nhân. Thông thường, mỗi tuần sẽ có 2-3 buổi học, mỗi buổi kéo dài 1.5-2 giờ. Lịch học có thể vào buổi tối các ngày trong tuần hoặc cả ngày cuối tuần. Bạn và mentor sẽ thống nhất lịch học phù hợp với cả hai bên trước khi bắt đầu khóa học.
                  </p>
                </div>
              </details>
            </motion.div>

            {/* FAQ 3 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="rounded-lg border border-pink-500/20 bg-pink-500/5 overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-white font-medium">
                  <span>Tôi có được hỗ trợ tìm việc sau khi hoàn thành khóa học không?</span>
                  <svg className="h-5 w-5 transform transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-pink-500/20 px-6 py-4">
                  <p className="text-gray-300">
                    Có! Sau khi hoàn thành khóa học, bạn sẽ nhận được hỗ trợ toàn diện trong việc tìm kiếm việc làm, bao gồm: xây dựng CV chuyên nghiệp, chuẩn bị portfolio ấn tượng, luyện tập phỏng vấn kỹ thuật
                  </p>
                </div>
              </details>
            </motion.div>

            {/* FAQ 4 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-white font-medium">
                  <span>Nếu tôi có câu hỏi hoặc cần hỗ trợ ngoài giờ học, mentor có thể trả lời không?</span>
                  <svg className="h-5 w-5 transform transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="border-t border-cyan-500/20 px-6 py-4">
                  <p className="text-gray-300">
                    Có! Học viên được hỗ trợ tích cực từ Mentor kể cả ngoài giờ học. Bạn có thể gửi câu hỏi qua email hoặc nhóm chat riêng, mentor sẽ phản hồi trong thời gian sớm nhất có thể. Điều này giúp bạn không bị lạc lõng và luôn có người hỗ trợ khi cần thiết.
                  </p>
                </div>
              </details>
            </motion.div>
          </div>
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            Ưu đãi kết thúc sau khi đếm ngược kết thúc
          </span>
        </span>
        
        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
            </svg>
            <ViewerCounter />
          </span>
        </span>
      </div>
      
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
        Đăng Ký Sớm - Tiết Kiệm 70%
      </h3>
      
      <h4 className="text-xl text-green-500 mb-4">Trở Thành Lập Trình Viên Trong 3 Tháng Chỉ Với</h4>

      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl sm:text-2xl text-gray-400 line-through">4.999.999₫</span>
          <span className="text-3xl sm:text-4xl font-bold text-white">1.999.999₫</span>
        </div>
        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs sm:text-sm rounded-full mb-3 sm:mb-4">
          <span className="animate-pulse">Tiết kiệm 3.000.000₫</span> - Giảm giá 70%
        </span>

        {/* Slot Progress */}
        <SlotProgressBar />
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
        className="rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 font-semibold text-white text-xl shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 group-hover:opacity-50 blur-lg transition-opacity duration-300"></div>
        <span className="relative flex items-center justify-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"></path>
          </svg>
          Đăng Ký Ngay - Giữ Chỗ
        </span>
      </motion.button>
      
      <div className="mt-6 flex flex-col gap-3">
        <div className="w-full max-w-md mx-auto bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-1">
          <p className="text-yellow-300 text-sm text-center font-medium">
            <span className="inline-flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Cam kết hoàn tiền 100% trong 7 ngày nếu không hài lòng
            </span>
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-xs text-gray-300">Thanh toán an toàn</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
            </svg>
            <span className="text-xs text-gray-300">Tài liệu học tập đầy đủ</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
            <span className="text-xs text-gray-300">Hỗ trợ 1-1 trọn đời</span>
          </div>
        </div>
        
        <p className="text-sm text-red-300">
          * Ưu đãi sẽ kết thúc ngay khi hết slot hoặc hết thời gian
        </p>
        <p className="text-sm text-gray-300">
          * Học phí sẽ tăng lên 2.999.999₫ cho đợt tuyển sinh kế tiếp
        </p>
      </div>
    </div>
  </motion.div>
</section>
    </main>
  );
}
