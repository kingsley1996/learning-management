import React from "react";
import Image from "next/image";
import Link from "next/link";

const PreviewSection = () => {
  return (
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
            CodeWithSamuel đồng hành cùng bạn trong quá trình học lập trình. Hãy
            cùng tìm hiểu
            <span className="text-gradient"> cách để sử dụng </span>
            trang web một cách hiệu quả nhé.
          </h1>
        </div>
        <div className="!mt-[9rem] md:!mt-0 w-[300px] h-[300px] flex items-center justify-center sm:w-[400px] sm:h-[400px] md:w-[700px] md:h-[700px] xl:w-[800px] xl:h-[800px] 2xl:w-[900px] 2xl:h-[900px] bg-transparent border-[#3f3f47] border-[1px] rounded-full relative">
          <span className="tp-circle-1"></span>
          <span className="tp-circle-2"></span>
          <div className="w-full flex flex-col md:flex-row items-center justify-center">
            <Link href="/roadmap" className="md:w-[60px] md:h-[60px] w-[55px] h-[55px] cursor-pointer bg-transparent flex items-center justify-center border border-[#f7f4f4] border-white rounded-full">
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
            </Link>
            <Link
              href="/roadmap"
              className="text-[24px] font-bold text-purple-600 font-Poppins pt-2 md:pl-3 cursor-pointer md:!text-[18px]"
            >
              Roadmap học lập trình cho bạn
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
  );
};

export default PreviewSection;
