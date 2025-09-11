"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetBlogPostsQuery, useDeleteBlogPostMutation } from "@/state/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/dialog";
import { MoreVertical, Edit, Trash2, Eye, Plus } from "lucide-react";
import { toast } from "sonner";

export default function TeacherBlogPage() {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const { data: posts, isLoading, refetch } = useGetBlogPostsQuery({});
  const [deletePost] = useDeleteBlogPostMutation();

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId).unwrap();
      toast.success("Đã xóa bài viết");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Xóa bài viết thất bại");
    }
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const openDeleteDialog = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Blog</h1>
        <Button
          onClick={() => {
            console.log("Button clicked, navigating to /teacher/blog/new");
            router.push("/teacher/blog/new");
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Viết bài mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Card
            key={post.id}
            className="group overflow-hidden hover:shadow-lg transition"
          >
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
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">
                  {post.title}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Xem
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/teacher/blog/edit/${post.id}`}
                        className="flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteDialog(post.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {post.excerpt}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.map((tag) => (
                  <Badge key={tag} className="bg-muted text-foreground">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {post.published ? (
                    <Badge className="bg-green-100 text-green-800">
                      Đã xuất bản
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Bản nháp
                    </Badge>
                  )}
                </span>
                <span>{post.authorName && `Tác giả: ${post.authorName}`}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Chưa có bài viết nào</p>
          <Button onClick={() => router.push("/teacher/blog/new")}>
            Viết bài đầu tiên
          </Button>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể
              hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => postToDelete && handleDelete(postToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
