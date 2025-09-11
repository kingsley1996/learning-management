"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Bell, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const Navbar = ({ isCoursePage }: { isCoursePage: boolean }) => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close search focus on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-navbar__container">
        <div className="dashboard-navbar__search">
          {/* Mobile Sidebar Trigger - Improved touch target */}
          <div className="md:hidden">
            <SidebarTrigger className="dashboard-navbar__sidebar-trigger p-3 -m-1 touch-manipulation" />
          </div>

          {/* Search Section - Mobile Optimized */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-md">
            <div 
              ref={searchRef}
              className="relative group w-full"
            >
              {/* Mobile: Show search button that expands, Desktop: Show search input */}
              <div className="block sm:hidden">
                {!isSearchFocused ? (
                  <button
                    onClick={() => setIsSearchFocused(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px] w-full"
                    aria-label="Open search"
                  >
                    <Search size={18} className="text-gray-500" />
                    <span className="text-gray-500 text-sm">Search</span>
                  </button>
                ) : (
                  <div className="fixed inset-0 bg-white z-50 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => setIsSearchFocused(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation"
                        aria-label="Close search"
                      >
                        <Search size={20} className="text-gray-600" />
                      </button>
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        autoFocus
                      />
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-gray-500 text-sm mb-4">Popular searches:</p>
                      <div className="space-y-2">
                        <Link 
                          href="/search?q=javascript"
                          onClick={() => setIsSearchFocused(false)}
                          className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 touch-manipulation"
                        >
                          JavaScript Courses
                        </Link>
                        <Link 
                          href="/search?q=react"
                          onClick={() => setIsSearchFocused(false)}
                          className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 touch-manipulation"
                        >
                          React Development
                        </Link>
                        <Link 
                          href="/search?q=python"
                          onClick={() => setIsSearchFocused(false)}
                          className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 touch-manipulation"
                        >
                          Python Programming
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Search Input */}
              <Link
                href="/search"
                className={cn(
                  "dashboard-navbar__search-input hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-opacity-50",
                  {
                    "!bg-customgreys-secondarybg": isCoursePage,
                  }
                )}
                scroll={false}
              >
                <Search size={18} className="text-gray-500" />
                <span className="text-gray-600 group-hover:text-gray-800">
                  Search Courses
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Actions Section - Mobile Optimized */}
        <div className="dashboard-navbar__actions flex items-center gap-2">
          {/* Notification Button - Improved touch target */}
          <button 
            className="dashboard-navbar__notification-button relative p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-manipulation"
            aria-label="View notifications"
          >
            <span className="dashboard-navbar__notification-indicator absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            <Bell className="dashboard-navbar__notification-icon w-5 h-5 text-gray-600" />
          </button>

          {/* User Button - Mobile Optimized */}
          <div className="relative">
            <SignedIn>
              <UserButton
                appearance={{
                  baseTheme: dark,
                  elements: {
                    userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                    userButtonBox: "scale-90 sm:scale-100 min-w-[44px] min-h-[44px] touch-manipulation",
                    userButtonTrigger: "p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200",
                  },
                }}
                showName={false}
                userProfileMode="navigation"
                userProfileUrl={
                  userRole === "teacher" ? "/teacher/profile" : "/user/profile"
                }
              />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px] flex items-center"
                  scroll={false}
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px] flex items-center"
                  scroll={false}
                >
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Join</span>
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
