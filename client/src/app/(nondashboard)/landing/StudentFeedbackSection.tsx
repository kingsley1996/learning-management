import React from "react";
import Image from "next/image";

const StudentFeedbackSection = () => {
  return (
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
        {/* REVIEW 1 - SHORT */}
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
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
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
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Giải thích rõ ràng, dễ hiểu. Recommend!
            </p>
          </div>
        </div>

        {/* REVIEW 2 - LONG */}
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
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
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
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Mình từng thử học lập trình ở nhiều nơi khác nhau nhưng thường bỏ dở giữa chừng. Nhưng với CodeWithSamuel thì khác, video có thời lượng dài và chi tiết, giúp mình hiểu từng bước một cách kỹ lưỡng. Đặc biệt là các ví dụ thực tế rất hay, sau khi học xong có thể áp dụng ngay vào công việc. Cảm ơn anh Samuel nhiều!
            </p>
          </div>
        </div>

        {/* REVIEW 3 - MEDIUM */}
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
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
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
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Học làm e-commerce với React JS ở đây rất thực tế. Từ lúc chưa biết gì về React, giờ mình đã tự tin làm được những dự án hoàn chỉnh. Cách dạy step by step rất dễ hiểu.
            </p>
          </div>
        </div>

        {/* REVIEW 4 - SHORT */}
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
                      Backend Developer
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
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
                ))}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  color="#e0e0e0"
                  className="mr-2 cursor-pointer"
                  style={{ color: "#e0e0e0" }}
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                </svg>
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Fix bug nhanh, content chất lượng. Ủng hộ!
            </p>
          </div>
        </div>

        {/* REVIEW 5 - LONG */}
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
                      Product Manager
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
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
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Ban đầu mình chỉ có background về business, không biết gì về tech. Nhưng sau khi theo dõi kênh CodeWithSamuel được 6 tháng, giờ mình đã hiểu rõ hơn về quá trình phát triển sản phẩm và có thể communicate với dev team hiệu quả hơn. Giá khóa học rất hợp lý so với giá trị nhận được. Team support cũng rất nhiệt tình, trả lời câu hỏi nhanh và chi tiết.
            </p>
          </div>
        </div>

        {/* REVIEW 6 - SHORT */}
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
                      CS Student
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex mt-1 ml-2 md:mt-0 md:ml-0">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
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
                ))}
              </div>
            </div>
            <p className="pt-2 px-2 font-Poppins">
              Perfect cho beginner như em. Thanks anh!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedbackSection;
