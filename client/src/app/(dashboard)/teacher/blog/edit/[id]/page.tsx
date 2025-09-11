"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetBlogPostByIdQuery,
  useUpdateBlogPostMutation,
  useGetUploadImageUrlMutation,
} from "@/state/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import BlogEditor from "@/components/BlogEditor";
import ImageUploader from "@/components/ImageUploader";
import { uploadBlogImage, formatDate } from "@/lib/utils";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;

  const {
    data: currentPost,
    isLoading,
    error,
    refetch,
  } = useGetBlogPostByIdQuery(postId, {
    skip: !postId,
  });
  const [updatePost, { isLoading: isUpdating }] = useUpdateBlogPostMutation();
  const [getUploadImageUrl] = useGetUploadImageUrlMutation();

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<File | string | null>("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Auto-generate slug từ title khi edit
  const handleTitleChange = (value: string) => {
    setTitle(value);
    // Chỉ auto-generate slug nếu slug hiện tại trùng với slug cũ được tạo từ title cũ
    if (currentPost && slug === generateSlugFromTitle(currentPost.title)) {
      const autoSlug = generateSlugFromTitle(value);
      setSlug(autoSlug);
    }
  };

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
      .replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i")
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u")
      .replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setSlug(currentPost.slug);
      setExcerpt(currentPost.excerpt || "");
      setCoverImage(currentPost.coverImageUrl || "");
      setTags(currentPost.tags?.join(", ") || "");
      setContent(currentPost.content);
      setPublished(currentPost.published);
    }
  }, [currentPost]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !slug) {
      toast.error("Vui lòng nhập tiêu đề và slug");
      return;
    }

    try {
      setUploading(true);
      let coverImageUrl = "";

      // Upload ảnh mới nếu có file được chọn
      if (coverImage instanceof File) {
        coverImageUrl = await uploadBlogImage(
          slug,
          coverImage,
          getUploadImageUrl
        );
      } else if (typeof coverImage === "string") {
        coverImageUrl = coverImage; // Giữ nguyên URL cũ
      }

      const updates = {
        title,
        slug,
        excerpt,
        coverImageUrl,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        content,
        published,
      };

      await updatePost({ id: postId, updates }).unwrap();
      toast.success("Đã cập nhật bài viết thành công!");

      // Refetch để cập nhật dữ liệu mới
      await refetch();

      router.push("/teacher/blog");
    } catch (err: any) {
      toast.error(err?.data?.message || "Cập nhật bài viết thất bại");
    } finally {
      setUploading(false);
    }
  }

  // Preview function
  const handlePreview = () => {
    if (currentPost?.slug) {
      window.open(`/blog/${currentPost.slug}`, "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold mb-2">Có lỗi xảy ra</h2>
          <p className="text-red-600">
            {error?.data?.message || "Không thể tải bài viết"}
          </p>
          <Button
            onClick={() => router.push("/teacher/blog")}
            className="mt-3"
            variant="outline"
          >
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Không tìm thấy bài viết
          </h2>
          <p className="text-gray-500 mb-4">
            Bài viết có thể đã bị xóa hoặc bạn không có quyền truy cập.
          </p>
          <Button onClick={() => router.push("/teacher/blog")}>
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/teacher/blog")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Chỉnh sửa bài viết</h1>
            <p className="text-gray-600">ID: {postId}</p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handlePreview}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Xem trước
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form fields - 2 columns */}
          <div className="md:col-span-2 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề bài viết *</Label>
              <Input
                id="title"
                placeholder="Nhập tiêu đề bài viết..."
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Đường dẫn (slug) *</Label>
              <Input
                id="slug"
                placeholder="duong-dan-bai-viet"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">URL: /blog/{slug}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Mô tả ngắn</Label>
              <Textarea
                id="excerpt"
                rows={3}
                placeholder="Tóm tắt ngắn gọn về nội dung bài viết..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Thẻ tag (cách nhau bằng dấu phẩy)</Label>
              <Input
                id="tags"
                placeholder="react, nextjs, javascript, web development"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              {tags && (
                <div className="flex flex-wrap gap-2">
                  {tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image uploader - 1 column */}
          <div>
            <ImageUploader
              value={coverImage}
              onChange={setCoverImage}
              currentImageUrl={typeof coverImage === "string" ? coverImage : ""}
              label="Ảnh bìa bài viết"
            />
          </div>
        </div>

        {/* Content editor */}
        <div className="space-y-2">
          <Label>Nội dung bài viết *</Label>
          <BlogEditor value={content} onChange={setContent} />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published" className="flex items-center gap-2">
              {published ? (
                <Eye className="h-4 w-4 text-green-600" />
              ) : (
                <EyeOff className="h-4 w-4 text-yellow-600" />
              )}
              <span
                className={published ? "text-green-600" : "text-yellow-600"}
              >
                {published ? "Đã xuất bản" : "Bản nháp"}
              </span>
            </Label>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/teacher/blog")}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || uploading}
              className="min-w-[140px]"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang upload...
                </>
              ) : isUpdating ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Cập nhật bài viết
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Metadata */}
        {currentPost && (
          <div className="text-sm text-gray-500 pt-4 border-t">
            <p>Tạo lúc: {formatDate(currentPost.createdAt)}</p>
            {currentPost.updatedAt && (
              <p>Cập nhật lần cuối: {formatDate(currentPost.updatedAt)}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
