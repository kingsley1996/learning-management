"use client";
import Link from "next/link";
import Image from "next/image";
import { useGetBlogPostsQuery } from "@/state/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  User,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function BlogListPage() {
  const { data: posts, isLoading } = useGetBlogPostsQuery({
    published: true,
    limit: 12,
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-600 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-600 rounded w-96 mx-auto"></div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-2xl border border-gray-700 shadow-sm overflow-hidden"
              >
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-600 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-600 rounded-full w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900/20 border border-blue-700 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Blog Lập Trình</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Khám Phá Thế Giới
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Lập Trình
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cập nhật những kiến thức mới nhất, tips & tricks, và kinh nghiệm
            thực tế từ cộng đồng developer Việt Nam
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-center">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {posts?.length || 0}+
              </span>
              <span className="text-sm text-gray-400">Bài viết</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                10K+
              </span>
              <span className="text-sm text-gray-400">Lượt đọc</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                5+
              </span>
              <span className="text-sm text-gray-400">Chủ đề</span>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <Card className="h-full overflow-hidden bg-gray-900/60 backdrop-blur-sm border border-gray-700 shadow-lg hover:shadow-2xl hover:border-gray-600 transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                  {/* Featured Badge */}
                  {index < 3 && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                        Nổi bật
                      </Badge>
                    </div>
                  )}

                  {/* Cover Image */}
                  {post.coverImageUrl ? (
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ) : (
                    <div className="h-48 sm:h-52 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-gray-500" />
                    </div>
                  )}

                  <CardHeader className="p-6 pb-4">
                    <CardTitle className="text-xl font-bold line-clamp-2 text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {post.title}
                    </CardTitle>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-3">
                      {post.authorName && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span className="truncate">{post.authorName}</span>
                        </div>
                      )}
                      {post.createdAt && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {formatDate(post.createdAt)?.split(" ")[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-2">
                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-300 line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            className="text-xs px-3 py-1 bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600 transition-colors"
                          >
                            #{tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge className="text-xs px-3 py-1 bg-gray-700 text-gray-400 border border-gray-600">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <span className="text-sm text-gray-400">
                        {Math.ceil(Math.random() * 5 + 2)} phút đọc
                      </span>
                      <div className="flex items-center gap-1 text-blue-400 font-medium text-sm group-hover:gap-2 transition-all duration-300">
                        <span>Đọc thêm</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-200 mb-3">
                Chưa có bài viết nào
              </h3>
              <p className="text-gray-400 mb-6">
                Hãy quay lại sau để khám phá những bài viết mới nhất về lập
                trình.
              </p>
            </div>
          </div>
        )}

        {/* CTA Section - Khóa học Fullstack - Gọn & Tím Gradient */}
        {posts && posts.length > 0 && (
          <div className="mt-20">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full translate-x-8 -translate-y-8"></div>
              </div>

              <div className="relative z-10 text-center">
                <h2 className="text-white-100 text-2xl sm:text-3xl font-bold mb-3">
                  Khóa Học Lập Trình Web Fullstack
                  {/* <span className="text-purple-200"> Kèm 1-1</span> */}
                </h2>

                <p className="text-purple-100 mb-6 max-w-xl mx-auto">
                  Từ Zero đến Hero! Frontend & Backend với mentor cá nhân.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/hoc-lap-trinh-1-1"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white-100 text-purple-600 font-semibold rounded-full transition-all duration-200 hover:scale-105"
                  >
                    <span>Đăng Ký Ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-sm text-purple-200">
                    ⚡ Ưu đãi cho 10 học viên đầu tiên
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
