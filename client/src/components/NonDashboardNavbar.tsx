"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navigationLinks = [
    { href: "/", label: "Trang Chủ", exactMatch: true },
    { href: "/roadmap", label: "Roadmap", exactMatch: true },
    { href: "/search", label: "Khoá Học", exactMatch: false },
    { href: "/blog", label: "Blog", exactMatch: false },
    { href: "/hoc-lap-trinh-1-1", label: "Học Lập Trình 1-1", exactMatch: true },
  ];

  // Function to check if link is active
  const isLinkActive = (href: string, exactMatch: boolean = false): boolean => {
    if (exactMatch) {
      return pathname === href;
    }
    
    if (href === "/") {
      return pathname === "/";
    }
    
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="nondashboard-navbar relative z-30">
        <header className="nondashboard-navbar__header">
          <div className="nondashboard-navbar__container">
            {/* Logo */}
            <div className="nondashboard-navbar__logo">
              <Link
                href="/"
                className="nondashboard-navbar__brand"
                scroll={false}
              >
                CodeWithSamuel
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="nondashboard-navbar__desktop-nav">
              <nav className="nondashboard-navbar__nav">
                {navigationLinks.map((link) => {
                  const isActive = isLinkActive(link.href, link.exactMatch);
                  return (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className={cn(
                        // Base styles
                        "nondashboard-navbar__nav-link relative transition-colors duration-200",
                        // Active styles - chỉ gạch ngang màu tím
                        isActive
                          ? "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-purple-600"
                          : "hover:text-gray-600"
                      )}
                      scroll={false}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="nondashboard-navbar__desktop-auth">
              <div className="nondashboard-navbar__auth-buttons">
                <SignedIn>
                  <UserButton
                    appearance={{
                      baseTheme: dark,
                      elements: {
                        userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                        userButtonBox: "scale-90 sm:scale-100",
                      },
                    }}
                    showName={false}
                    userProfileMode="navigation"
                    userProfileUrl={
                      userRole === "teacher"
                        ? "/teacher/profile"
                        : "/user/profile"
                    }
                  />
                </SignedIn>
                <SignedOut>
                  <Link
                    href="/signin"
                    className="nondashboard-navbar__auth-button--login"
                    scroll={false}
                  >
                    <span className="hidden sm:inline">Log in</span>
                    <span className="sm:hidden">Login</span>
                  </Link>
                  <Link
                    href="/signup"
                    className="nondashboard-navbar__auth-button--signup"
                    scroll={false}
                  >
                    <span className="hidden sm:inline">Sign up</span>
                    <span className="sm:hidden">Signup</span>
                  </Link>
                </SignedOut>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="nondashboard-navbar__mobile-menu-button">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="nondashboard-navbar__menu-toggle"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu - VẪN GIỮ NGUYÊN VỊ TRÍ */}
          <div 
            className={cn(
              "nondashboard-navbar__mobile-menu",
              // Thêm z-index cao và proper positioning
              "relative z-50",
              isMenuOpen ? 'nondashboard-navbar__mobile-menu--open' : ''
            )}
          >
            <div className="nondashboard-navbar__mobile-menu-content">
              {/* Mobile Navigation Links */}
              <nav className="nondashboard-navbar__mobile-nav">
                {navigationLinks.map((link) => {
                  const isActive = isLinkActive(link.href, link.exactMatch);
                  return (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className={cn(
                        // Base mobile styles - thêm z-index và pointer-events
                        "nondashboard-navbar__mobile-nav-link relative transition-colors duration-200 block pointer-events-auto",
                        // Active mobile styles - chỉ gạch ngang màu tím bên trái
                        isActive
                          ? "border-l-2 border-purple-600 pl-4"
                          : "hover:text-gray-600"
                      )}
                      scroll={false}
                      onClick={handleLinkClick}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="nondashboard-navbar__mobile-auth">
                <SignedIn>
                  <div className="nondashboard-navbar__mobile-user">
                    <UserButton
                      appearance={{
                        baseTheme: dark,
                        elements: {
                          userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                          userButtonBox: "scale-100",
                        },
                      }}
                      showName={true}
                      userProfileMode="navigation"
                      userProfileUrl={
                        userRole === "teacher"
                          ? "/teacher/profile"
                          : "/user/profile"
                      }
                    />
                  </div>
                </SignedIn>
                <SignedOut>
                  <div className="nondashboard-navbar__mobile-auth-buttons">
                    <Link
                      href="/signin"
                      className="nondashboard-navbar__mobile-auth-button--login pointer-events-auto"
                      scroll={false}
                      onClick={handleLinkClick}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="nondashboard-navbar__mobile-auth-button--signup pointer-events-auto"
                      scroll={false}
                      onClick={handleLinkClick}
                    >
                      Sign up
                    </Link>
                  </div>
                </SignedOut>
              </div>
            </div>
          </div>
        </header>
      </nav>

      {/* Mobile Menu Overlay - CHỈ FIX Z-INDEX */}
      {isMenuOpen && (
        <div 
          className="nondashboard-navbar__overlay fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NonDashboardNavbar;
