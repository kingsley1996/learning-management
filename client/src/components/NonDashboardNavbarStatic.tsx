import Link from "next/link";
import React from "react";

// Static version of Navbar for initial render
export const NonDashboardNavbarStatic = () => {
  return (
    <nav className="items-center justify-center sticky top-0 inset-x-0 backdrop-blur-lg backdrop-saturate-150 w-full flex h-20 border-b border-[#ffffff1c] z-[999] shadow">
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-16 max-w-full">
        <div className="w-[95%] md:!w-[90%] 2xl:!w-[85%] m-auto flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-[20px] md:text-[25px] font-Poppins font-[500] z-[91] relative"
              scroll={false}
            >
              CodeWithSamuel
            </Link>
          </div>
          <div>
            <nav className="w-full hidden md:flex items-center">
              <Link
                href="/"
                className="px-5 text-[18px] font-Poppins font-[500] false"
                scroll={false}
              >
                Trang Chủ
              </Link>
              <Link
                href="/"
                className="px-5 text-[18px] font-Poppins font-[500] false"
                scroll={false}
              >
                Giới Thiệu
              </Link>
              <Link
                href="/search"
                className="px-5 text-[18px] font-Poppins font-[500] false"
                scroll={false}
              >
                Khoá Học
              </Link>
              <Link
                href="/blog"
                className="px-5 text-[18px] font-Poppins font-[500] false"
                scroll={false}
              >
                Blog
              </Link>
              <Link
                href="/hoc-lap-trinh-1-1"
                className="px-5 text-[18px] font-Poppins font-[500] false"
                scroll={false}
              >
                Học Lập Trình 1-1
              </Link>
            </nav>
          </div>
          <div>
            <div className="w-full flex items-center">
              <div className="flex items-center justify-center mx-4 gap-4">
                <Link
                  href="/signin"
                  className="nondashboard-navbar__auth-button--login"
                  scroll={false}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="nondashboard-navbar__auth-button--signup"
                  scroll={false}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};
