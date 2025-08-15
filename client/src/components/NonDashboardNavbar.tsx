"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.nondashboard-navbar')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

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

  const navigationLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/", label: "Giới Thiệu" },
    { href: "/search", label: "Khoá Học" },
    { href: "/hoc-lap-trinh-1-1", label: "Học Lập Trình 1-1" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="nondashboard-navbar">
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
              {navigationLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="nondashboard-navbar__nav-link"
                  scroll={false}
                >
                  {link.label}
                </Link>
              ))}
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

        {/* Mobile Navigation Menu */}
        <div className={`nondashboard-navbar__mobile-menu ${isMenuOpen ? 'nondashboard-navbar__mobile-menu--open' : ''}`}>
          <div className="nondashboard-navbar__mobile-menu-content">
            {/* Mobile Navigation Links */}
            <nav className="nondashboard-navbar__mobile-nav">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="nondashboard-navbar__mobile-nav-link"
                  scroll={false}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
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
                    className="nondashboard-navbar__mobile-auth-button--login"
                    scroll={false}
                    onClick={handleLinkClick}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="nondashboard-navbar__mobile-auth-button--signup"
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="nondashboard-navbar__overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default NonDashboardNavbar;
