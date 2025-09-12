"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetBlogPostBySlugQuery } from "@/state/api";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "isomorphic-dompurify";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const { data: post, isLoading } = useGetBlogPostBySlugQuery(slug, {
    skip: !slug,
  });

  // Apply syntax highlighting after content loads
  useEffect(() => {
    if (post?.content) {
      setTimeout(() => {
        // Highlight code blocks
        document
          .querySelectorAll("pre code, .ql-code-block")
          .forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
          });
      }, 100);
    }
  }, [post?.content]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Hero Skeleton */}
        <div className="relative">
          {/* Cover Image Skeleton */}
          <div className="relative w-full h-[60vh] overflow-hidden rounded-2xl mx-4 mt-4 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            {/* Image placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-slate-500 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Header Content Skeleton */}
          <div className="px-4 py-12">
            <div className="max-w-6xl mx-auto">
              {" "}
              {/* Tăng từ 4xl lên 6xl */}
              <div className="space-y-6">
                {/* Title Skeleton */}
                <div className="space-y-3">
                  <div className="h-12 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-lg animate-pulse w-full"></div>
                  <div className="h-8 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-lg w-5/6 animate-pulse"></div>{" "}
                  {/* Tăng từ 3/4 lên 5/6 */}
                </div>

                {/* Excerpt Skeleton */}
                <div className="space-y-2 max-w-5xl">
                  {" "}
                  {/* Tăng từ 3xl lên 5xl */}
                  <div className="h-6 bg-slate-700/80 rounded animate-pulse w-full"></div>
                  <div className="h-6 bg-slate-700/80 rounded w-4/5 animate-pulse"></div>{" "}
                  {/* Tăng từ 5/6 lên 4/5 */}
                  <div className="h-6 bg-slate-700/80 rounded w-3/4 animate-pulse"></div>{" "}
                  {/* Thêm dòng thứ 3 */}
                </div>

                {/* Author & Meta Skeleton */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-700/80 rounded w-32 animate-pulse"></div>{" "}
                      {/* Tăng từ 24 lên 32 */}
                      <div className="h-3 bg-slate-700/60 rounded w-28 animate-pulse"></div>{" "}
                      {/* Tăng từ 20 lên 28 */}
                    </div>
                  </div>

                  {/* Tags Skeleton */}
                  <div className="flex gap-2">
                    <div className="h-6 bg-slate-700/80 rounded-full w-20 animate-pulse"></div>{" "}
                    {/* Tăng từ 16 lên 20 */}
                    <div className="h-6 bg-slate-700/80 rounded-full w-24 animate-pulse"></div>{" "}
                    {/* Tăng từ 20 lên 24 */}
                    <div className="h-6 bg-slate-700/80 rounded-full w-18 animate-pulse"></div>{" "}
                    {/* Tăng từ 14 lên 18 */}
                    <div className="h-6 bg-slate-700/80 rounded-full w-22 animate-pulse"></div>{" "}
                    {/* Thêm tag thứ 4 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section Skeleton */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {" "}
          {/* Tăng từ 4xl lên 6xl */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/60 overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12 space-y-8">
              {/* Paragraph Skeletons */}
              <div className="space-y-4">
                <div className="h-5 bg-slate-700/70 rounded animate-pulse w-full"></div>{" "}
                {/* Full width */}
                <div className="h-5 bg-slate-700/70 rounded w-11/12 animate-pulse"></div>{" "}
                {/* Giữ nguyên */}
                <div className="h-5 bg-slate-700/70 rounded w-5/6 animate-pulse"></div>{" "}
                {/* Tăng từ 4/5 lên 5/6 */}
                <div className="h-5 bg-slate-700/70 rounded w-4/5 animate-pulse"></div>{" "}
                {/* Thêm dòng thứ 4 */}
              </div>

              {/* Heading Skeleton */}
              <div className="space-y-3 pt-4">
                <div className="h-8 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-lg w-3/4 animate-pulse"></div>{" "}
                {/* Tăng từ 2/3 lên 3/4 */}
              </div>

              {/* More Paragraphs */}
              <div className="space-y-4">
                <div className="h-5 bg-slate-700/70 rounded animate-pulse w-full"></div>{" "}
                {/* Full width */}
                <div className="h-5 bg-slate-700/70 rounded w-11/12 animate-pulse"></div>{" "}
                {/* Tăng từ 5/6 lên 11/12 */}
                <div className="h-5 bg-slate-700/70 rounded w-5/6 animate-pulse"></div>{" "}
                {/* Tăng từ 3/4 lên 5/6 */}
                <div className="h-5 bg-slate-700/70 rounded w-4/5 animate-pulse"></div>{" "}
                {/* Giữ nguyên */}
                <div className="h-5 bg-slate-700/70 rounded w-3/4 animate-pulse"></div>{" "}
                {/* Thêm dòng thứ 5 */}
              </div>

              {/* Code Block Skeleton */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-600/50 animate-pulse">
                {/* macOS dots */}
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500/50 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500/50 rounded-full"></div>
                </div>
                {/* Code badge */}
                <div className="absolute top-4 right-4 bg-blue-500/20 rounded-full px-3 py-1">
                  <div className="h-3 w-8 bg-blue-400/50 rounded animate-pulse"></div>
                </div>
                {/* Code lines */}
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-slate-600/50 rounded w-5/6 animate-pulse"></div>{" "}
                  {/* Tăng từ 3/4 lên 5/6 */}
                  <div className="h-4 bg-slate-600/50 rounded w-3/5 animate-pulse"></div>{" "}
                  {/* Tăng từ 1/2 lên 3/5 */}
                  <div className="h-4 bg-slate-600/50 rounded w-4/5 animate-pulse"></div>{" "}
                  {/* Tăng từ 2/3 lên 4/5 */}
                  <div className="h-4 bg-slate-600/50 rounded w-2/5 animate-pulse"></div>{" "}
                  {/* Tăng từ 1/3 lên 2/5 */}
                  <div className="h-4 bg-slate-600/50 rounded w-3/4 animate-pulse"></div>{" "}
                  {/* Thêm dòng code thứ 5 */}
                  <div className="h-4 bg-slate-600/50 rounded w-1/2 animate-pulse"></div>{" "}
                  {/* Thêm dòng code thứ 6 */}
                </div>
              </div>

              {/* List Skeleton */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/40 rounded-full animate-pulse flex-shrink-0 mt-1"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700/70 rounded animate-pulse w-full"></div>{" "}
                    {/* Full width */}
                    <div className="h-4 bg-slate-700/70 rounded w-5/6 animate-pulse"></div>{" "}
                    {/* Tăng từ 4/5 lên 5/6 */}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/40 rounded-full animate-pulse flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-700/70 rounded w-11/12 animate-pulse"></div>{" "}
                    {/* Tăng từ 3/4 lên 11/12 */}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/40 rounded-full animate-pulse flex-shrink-0 mt-1"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700/70 rounded animate-pulse w-full"></div>{" "}
                    {/* Full width */}
                    <div className="h-4 bg-slate-700/70 rounded w-4/5 animate-pulse"></div>{" "}
                    {/* Tăng từ 2/3 lên 4/5 */}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {" "}
                  {/* Thêm list item thứ 4 */}
                  <div className="w-6 h-6 bg-blue-500/40 rounded-full animate-pulse flex-shrink-0 mt-1"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-700/70 rounded w-5/6 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Quote Skeleton */}
              <div className="border-l-4 border-blue-500/50 bg-slate-700/30 rounded-r-lg p-6 animate-pulse">
                <div className="space-y-3">
                  <div className="h-5 bg-slate-600/70 rounded animate-pulse w-full"></div>{" "}
                  {/* Full width */}
                  <div className="h-5 bg-slate-600/70 rounded w-11/12 animate-pulse"></div>{" "}
                  {/* Tăng từ 4/5 lên 11/12 */}
                  <div className="h-5 bg-slate-600/70 rounded w-5/6 animate-pulse"></div>{" "}
                  {/* Tăng từ 3/4 lên 5/6 */}
                  <div className="h-5 bg-slate-600/70 rounded w-4/5 animate-pulse"></div>{" "}
                  {/* Thêm dòng thứ 4 */}
                </div>
              </div>

              {/* Another Heading Skeleton */}
              <div className="space-y-3 pt-4">
                <div className="h-7 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 rounded-lg w-2/3 animate-pulse"></div>
              </div>

              {/* Final Paragraphs */}
              <div className="space-y-4">
                <div className="h-5 bg-slate-700/70 rounded animate-pulse w-full"></div>{" "}
                {/* Full width */}
                <div className="h-5 bg-slate-700/70 rounded w-11/12 animate-pulse"></div>{" "}
                {/* Tăng từ 5/6 lên 11/12 */}
                <div className="h-5 bg-slate-700/70 rounded w-4/5 animate-pulse"></div>{" "}
                {/* Tăng từ 3/5 lên 4/5 */}
                <div className="h-5 bg-slate-700/70 rounded w-5/6 animate-pulse"></div>{" "}
                {/* Thêm dòng thứ 4 */}
                <div className="h-5 bg-slate-700/70 rounded w-3/4 animate-pulse"></div>{" "}
                {/* Thêm dòng thứ 5 */}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CSS for beautiful skeleton */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          .animate-pulse:nth-child(2n) {
            animation-delay: 0.1s;
          }

          .animate-pulse:nth-child(3n) {
            animation-delay: 0.2s;
          }

          /* Shimmer effect for main elements */
          .bg-gradient-to-r {
            background-size: 200% 100%;
            animation: shimmer 1.5s ease-in-out infinite;
          }

          /* Staggered animation for better visual flow */
          .space-y-4 > *:nth-child(1) {
            animation-delay: 0s;
          }
          .space-y-4 > *:nth-child(2) {
            animation-delay: 0.1s;
          }
          .space-y-4 > *:nth-child(3) {
            animation-delay: 0.2s;
          }
          .space-y-4 > *:nth-child(4) {
            animation-delay: 0.3s;
          }
          .space-y-4 > *:nth-child(5) {
            animation-delay: 0.4s;
          }

          .space-y-3 > *:nth-child(1) {
            animation-delay: 0s;
          }
          .space-y-3 > *:nth-child(2) {
            animation-delay: 0.1s;
          }
          .space-y-3 > *:nth-child(3) {
            animation-delay: 0.2s;
          }
          .space-y-3 > *:nth-child(4) {
            animation-delay: 0.3s;
          }
        `}</style>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6 animate-bounce">📝</div>
        <h2 className="text-2xl font-bold mb-3 text-white">
          Không tìm thấy bài viết
        </h2>
        <p className="text-slate-400 text-lg">
          Bài viết có thể đã bị xóa hoặc không tồn tại.
        </p>
      </div>
    );
  }

  // Sanitize HTML content từ React-Quill
  const sanitizedContent = DOMPurify.sanitize(post.content || "");

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {post.coverImageUrl && (
          <div className="relative w-full h-[60vh] overflow-hidden rounded-2xl mx-4 mt-4">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Header Content */}
        <div className="px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <header className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-slate-200 drop-shadow-md">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 pt-4">
                {post.authorName && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {post.authorName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white drop-shadow">
                        {post.authorName}
                      </p>
                      {post.createdAt && (
                        <p className="text-sm text-slate-300 drop-shadow">
                          {new Date(post.createdAt).toLocaleDateString(
                            "vi-VN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="px-3 py-1 text-sm font-medium bg-slate-700/90 text-slate-100 border-slate-500 hover:bg-slate-600/90 backdrop-blur-sm transition-all duration-300 shadow-lg"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </header>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/60 overflow-hidden shadow-2xl">
          <div className="prose prose-xl prose-invert max-w-none p-8 md:p-12">
            <div
              className="ql-editor content-display"
              dangerouslySetInnerHTML={{
                __html: sanitizedContent,
              }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced CSS styling for dark theme */}
      <style jsx global>{`
        /* Base content styling for dark theme */
        .content-display {
          padding: 0 !important;
          border: none !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          line-height: 1.8;
          font-size: 1.125rem;
          color: #e2e8f0;
        }

        /* Enhanced typography hierarchy for dark theme */
        .content-display h1,
        .content-display h2,
        .content-display h3,
        .content-display h4,
        .content-display h5,
        .content-display h6 {
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
          scroll-margin-top: 6rem;
          color: #f1f5f9;
        }

        .content-display h1 {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 2rem;
          border-bottom: 3px solid #475569;
          padding-bottom: 0.75rem;
        }

        .content-display h2 {
          font-size: 2rem;
          color: #f3f4f6;
          position: relative;
          padding-left: 1.5rem;
        }

        .content-display h2::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.5rem;
          height: 2rem;
          width: 5px;
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          border-radius: 3px;
        }

        .content-display h3 {
          font-size: 1.75rem;
          color: #e5e7eb;
          border-left: 4px solid #60a5fa;
          padding-left: 1.5rem;
          margin-left: -1.5rem;
          background: linear-gradient(
            90deg,
            rgba(96, 165, 250, 0.1),
            transparent
          );
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0 8px 8px 0;
        }

        .content-display h4 {
          font-size: 1.5rem;
          color: #cbd5e1;
          font-weight: 600;
        }

        .content-display h5 {
          font-size: 1.25rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .content-display h6 {
          font-size: 1.125rem;
          color: #64748b;
          font-weight: 600;
        }

        /* Enhanced paragraph styling for dark theme */
        .content-display p {
          margin-bottom: 1.5rem;
          text-align: justify;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #e2e8f0;
        }

        .content-display p:first-of-type {
          font-size: 1.25rem;
          font-weight: 400;
          color: #f1f5f9;
          margin-bottom: 2rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        /* Enhanced list styling - ỔN với numbered lists */
        .content-display ul,
        .content-display ol {
          margin: 2rem 0;
          padding-left: 0;
          list-style: none;
        }

        /* Unordered lists với bullet points đẹp */
        .content-display ul li {
          position: relative;
          padding-left: 2.5rem;
          margin-bottom: 1.2rem;
          line-height: 1.7;
          color: #e2e8f0;
        }

        .content-display ul li::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #60a5fa;
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(96, 165, 250, 0.3);
        }

        /* Ordered lists với numbered circles - HOÀN TOÀN ỔN cho UX */
        .content-display ol {
          counter-reset: list-counter;
        }

        .content-display ol li {
          position: relative;
          padding-left: 3rem;
          margin-bottom: 1.2rem;
          line-height: 1.7;
          counter-increment: list-counter;
          color: #e2e8f0;
        }

        .content-display ol li::before {
          content: counter(list-counter);
          position: absolute;
          left: 0;
          top: 0.1rem;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          color: white;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 700;
          box-shadow: 0 4px 6px -1px rgba(96, 165, 250, 0.3),
            0 2px 4px -1px rgba(96, 165, 250, 0.2);
        }

        /* Nested lists support */
        .content-display ul ul,
        .content-display ol ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .content-display ul ul li::before {
          content: "◦";
          color: #94a3b8;
          font-size: 1rem;
        }

        .content-display ol ol li::before {
          background: linear-gradient(135deg, #94a3b8, #64748b);
          width: 1.5rem;
          height: 1.5rem;
          font-size: 0.75rem;
        }

        /* Spectacular code block styling for dark theme */
        .content-display .ql-code-block-container {
          margin: 3rem 0;
          padding-top: 30px;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
          border: 1px solid #334155;
        }

        /* Hide language selector */
        .content-display .ql-code-block-container select.ql-ui {
          display: none !important;
        }

        /* macOS-style header */
        .content-display .ql-code-block-container::before {
          content: "";
          position: absolute;
          top: 16px;
          left: 20px;
          width: 12px;
          height: 12px;
          background: #ff5f56;
          border-radius: 50%;
          box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27ca3f;
          z-index: 10;
        }

        /* Language badge */
        .content-display .ql-code-block-container::after {
          content: "CODE";
          position: absolute;
          top: 12px;
          right: 20px;
          background: rgba(96, 165, 250, 0.2);
          backdrop-filter: blur(8px);
          color: #60a5fa;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(96, 165, 250, 0.3);
          z-index: 10;
        }

        .content-display .ql-code-block {
          background: transparent !important;
          color: #f1f5f9 !important;
          font-family: "JetBrains Mono", "Fira Code", "SF Mono", "Monaco",
            "Consolas", monospace !important;
          font-size: 15px !important;
          line-height: 1.7 !important;
          padding: 12px 24px !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          white-space: pre-wrap;
        }

        .content-display .ql-code-block:first-child {
          padding-top: 50px !important;
        }

        .content-display .ql-code-block:last-child {
          padding-bottom: 24px !important;
        }

        /* Hover effect for code blocks */
        .content-display .ql-code-block-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(96, 165, 250, 0.1);
          transition: all 0.3s ease;
        }

        /* Enhanced blockquote for dark theme */
        .content-display blockquote {
          border-left: 6px solid #60a5fa;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          margin: 2.5rem 0;
          padding: 2rem;
          border-radius: 12px;
          font-style: italic;
          font-size: 1.25rem;
          position: relative;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          color: #e2e8f0;
          border: 1px solid #475569;
        }

        .content-display blockquote::before {
          content: '"';
          position: absolute;
          top: -0.5rem;
          left: 1.5rem;
          font-size: 4rem;
          color: #60a5fa;
          opacity: 0.4;
          font-family: serif;
        }

        /* Enhanced images for dark theme */
        .content-display img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 3rem auto;
          display: block;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 10px 10px -5px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #475569;
        }

        .content-display img:hover {
          transform: scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(96, 165, 250, 0.2);
        }

        /* Enhanced links for dark theme */
        .content-display a {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 500;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          background-size: 0% 2px;
          background-repeat: no-repeat;
          background-position: left bottom;
          transition: all 0.3s ease;
          padding-bottom: 2px;
        }

        .content-display a:hover {
          background-size: 100% 2px;
          color: #93c5fd;
        }

        /* Enhanced inline code for dark theme */
        .content-display code:not(.ql-code-block) {
          background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
          color: #fbbf24;
          padding: 4px 8px;
          border-radius: 6px;
          font-family: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
          font-size: 0.9em;
          font-weight: 600;
          border: 1px solid #6b7280;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        /* Table styling for dark theme */
        .content-display table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          background: #1e293b;
          border: 1px solid #475569;
        }

        .content-display th,
        .content-display td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #475569;
          font-size: 1rem;
        }

        .content-display th {
          background: #334155;
          font-weight: 600;
          color: #f1f5f9;
        }

        .content-display td {
          color: #e2e8f0;
        }

        .content-display tr:hover {
          background: #334155/50;
        }

        /* Reading progress indicator */
        .content-display::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          z-index: 1000;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .content-display {
            font-size: 1rem;
          }

          .content-display h1 {
            font-size: 2rem;
          }

          .content-display h2 {
            font-size: 1.75rem;
          }

          .content-display h3 {
            font-size: 1.5rem;
          }

          .content-display ol li::before {
            width: 1.5rem;
            height: 1.5rem;
            font-size: 0.75rem;
          }

          .content-display ol li {
            padding-left: 2.5rem;
          }

          .content-display .ql-code-block-container {
            margin: 2rem 0;
            border-radius: 12px;
          }

          .content-display .ql-code-block {
            font-size: 14px !important;
            padding: 16px !important;
          }

          .content-display .ql-code-block:first-child {
            padding-top: 40px !important;
          }
        }

        /* Print styles */
        @media print {
          .content-display .ql-code-block-container {
            background: #f8f9fa !important;
            box-shadow: none !important;
            border: 2px solid #dee2e6 !important;
          }

          .content-display .ql-code-block {
            color: #212529 !important;
            background: transparent !important;
          }

          .content-display ol li::before {
            background: #6c757d !important;
            color: white !important;
          }
        }
      `}</style>
    </article>
  );
}
