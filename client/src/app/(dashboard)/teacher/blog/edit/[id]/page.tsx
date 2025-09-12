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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff, 
  Calendar, 
  Tag, 
  Image as ImageIcon,
  FileText,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-generate slug từ title khi edit
  const handleTitleChange = (value: string) => {
    setTitle(value);
    setHasUnsavedChanges(true);
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

  const trackChanges = () => {
    setHasUnsavedChanges(true);
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
      setHasUnsavedChanges(false);
    }
  }, [currentPost]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !slug) {
      toast.error("Vui lòng nhập tiêu đề và slug");
      return;
    }

    try {
      setUploading(true);
      let coverImageUrl = "";

      if (coverImage instanceof File) {
        toast.info("Đang upload ảnh...");
        coverImageUrl = await uploadBlogImage(
          slug,
          coverImage,
          getUploadImageUrl
        );
      } else if (typeof coverImage === "string") {
        coverImageUrl = coverImage;
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
      setHasUnsavedChanges(false);

      await refetch();
      router.push("/teacher/blog");
    } catch (err: any) {
      toast.error(err?.data?.message || "Cập nhật bài viết thất bại");
    } finally {
      setUploading(false);
    }
  }

  const handlePreview = () => {
    if (currentPost?.slug) {
      window.open(`/blog/${currentPost.slug}`, "_blank");
    }
  };

  const handleSaveDraft = async () => {
    if (!title || !slug) {
      toast.error("Vui lòng nhập tiêu đề và slug trước khi lưu nháp");
      return;
    }

    try {
      setUploading(true);
      let coverImageUrl = "";

      if (coverImage instanceof File) {
        coverImageUrl = await uploadBlogImage(
          slug,
          coverImage,
          getUploadImageUrl
        );
      } else if (typeof coverImage === "string") {
        coverImageUrl = coverImage;
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
        published: false,
      };

      await updatePost({ id: postId, updates }).unwrap();
      toast.success("Đã lưu bản nháp!");
      setHasUnsavedChanges(false);
      await refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Lưu bản nháp thất bại");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-8 w-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-white">Đang tải bài viết</h3>
            <p className="text-slate-400">Vui lòng chờ trong giây lát...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-6 w-full max-w-md">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Có lỗi xảy ra</h3>
            </div>
            <p className="text-slate-300">
              {error?.data?.message || "Không thể tải bài viết"}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="flex-1 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50"
              >
                Thử lại
              </Button>
              <Button
                onClick={() => router.push("/teacher/blog")}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-8 w-full max-w-md">
          <div className="text-center space-y-4">
            <div className="text-6xl">📝</div>
            <h2 className="text-xl font-semibold text-white">
              Không tìm thấy bài viết
            </h2>
            <p className="text-slate-400">
              Bài viết có thể đã bị xóa hoặc bạn không có quyền truy cập.
            </p>
            <Button 
              onClick={() => router.push("/teacher/blog")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Quay lại danh sách
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (hasUnsavedChanges) {
                    if (confirm("Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời khỏi trang này?")) {
                      router.push("/teacher/blog");
                    }
                  } else {
                    router.push("/teacher/blog");
                  }
                }}
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">Chỉnh sửa bài viết</h1>
                  {hasUnsavedChanges && (
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Có thay đổi chưa lưu
                    </Badge>
                  )}
                </div>
                <p className="text-slate-400 text-sm">ID: {postId}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                size="sm"
                className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Xem trước
              </Button>
              <Button
                type="button"
                onClick={handleSaveDraft}
                disabled={isUpdating || uploading}
                size="sm"
                className="bg-slate-700/70 hover:bg-slate-600/70 text-slate-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu nháp
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Basic Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl">
                <div className="p-6 border-b border-slate-700/60">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Thông tin cơ bản
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-200">Tiêu đề bài viết *</Label>
                    <Input
                      id="title"
                      placeholder="Nhập tiêu đề bài viết..."
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                      className="text-lg font-medium bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-slate-200">Đường dẫn (slug) *</Label>
                    <Input
                      id="slug"
                      placeholder="duong-dan-bai-viet"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        trackChanges();
                      }}
                      required
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    />
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Globe className="h-3 w-3" />
                      URL: /blog/{slug}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-slate-200">Mô tả ngắn</Label>
                    <Textarea
                      id="excerpt"
                      rows={3}
                      placeholder="Tóm tắt ngắn gọn về nội dung bài viết (150-300 ký tự)..."
                      value={excerpt}
                      onChange={(e) => {
                        setExcerpt(e.target.value);
                        trackChanges();
                      }}
                      maxLength={300}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 resize-none"
                    />
                    <div className="text-xs text-slate-400 text-right">
                      {excerpt.length}/300 ký tự
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl">
                <div className="p-6 border-b border-slate-700/60">
                  <h3 className="text-lg font-semibold text-white">Nội dung bài viết</h3>
                </div>
                <div className="p-6">
                  <BlogEditor 
                    value={content} 
                    onChange={(value) => {
                      setContent(value);
                      trackChanges();
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Status */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl">
                <div className="p-4 border-b border-slate-700/60">
                  <h4 className="font-semibold text-white">Trạng thái xuất bản</h4>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {published ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 font-medium">Đã xuất bản</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-400 font-medium">Bản nháp</span>
                        </>
                      )}
                    </div>
                    <Switch
                      checked={published}
                      onCheckedChange={(checked) => {
                        setPublished(checked);
                        trackChanges();
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate-400">
                    {published 
                      ? "Bài viết này có thể được xem bởi mọi người"
                      : "Chỉ bạn mới có thể xem bài viết này"
                    }
                  </p>
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl">
                <div className="p-4 border-b border-slate-700/60">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Ảnh bìa
                  </h4>
                </div>
                <div className="p-4">
                  <ImageUploader
                    value={coverImage}
                    onChange={(value) => {
                      setCoverImage(value);
                      trackChanges();
                    }}
                    currentImageUrl={typeof coverImage === "string" ? coverImage : ""}
                    label=""
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl">
                <div className="p-4 border-b border-slate-700/60">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Thẻ tags
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  <Textarea
                    rows={3}
                    placeholder="react, nextjs, javascript, web development"
                    value={tags}
                    onChange={(e) => {
                      setTags(e.target.value);
                      trackChanges();
                    }}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 resize-none"
                  />
                  {tags && (
                    <div className="flex flex-wrap gap-1">
                      {tags.split(",").map((tag, index) => (
                        <Badge key={index} className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          #{tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl">
                <div className="p-4 border-b border-slate-700/60">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Thông tin
                  </h4>
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-slate-400">Tạo lúc</p>
                    <p className="font-medium text-slate-200">{formatDate(currentPost.createdAt)}</p>
                  </div>
                  {currentPost.updatedAt && (
                    <div className="space-y-1">
                      <p className="text-slate-400">Cập nhật lần cuối</p>
                      <p className="font-medium text-slate-200">{formatDate(currentPost.updatedAt)}</p>
                    </div>
                  )}
                  <div className="border-t border-slate-700/60 pt-3">
                    <div className="space-y-1">
                      <p className="text-slate-400">Tác giả</p>
                      <p className="font-medium text-slate-200">{currentPost.authorName || "Không rõ"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <AlertCircle className="h-4 w-4" />
                    Bạn có thay đổi chưa được lưu
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (hasUnsavedChanges) {
                      if (confirm("Bạn có thay đổi chưa lưu. Bạn có chắc muốn hủy bỏ?")) {
                        router.push("/teacher/blog");
                      }
                    } else {
                      router.push("/teacher/blog");
                    }
                  }}
                  className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50"
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating || uploading}
                  className="min-w-[160px] bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang upload...
                    </>
                  ) : isUpdating ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {published ? "Cập nhật & Xuất bản" : "Lưu bản nháp"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
