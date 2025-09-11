"use client";
import Link from "next/link";
import Image from "next/image";
import { useGetBlogPostsQuery } from "@/state/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogListPage() {
  const { data: posts, isLoading } = useGetBlogPostsQuery({
    published: true,
    limit: 12,
  });

  if (isLoading) {
    return <div className="p-6">Đang tải bài viết...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog Lập Trình</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="group h-full overflow-hidden hover:shadow-lg transition">
              {post.coverImageUrl && (
                <div className="relative h-40 w-full">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} className="bg-muted text-foreground">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
