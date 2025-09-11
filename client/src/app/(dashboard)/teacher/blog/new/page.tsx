// pages/NewBlogPostPage.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBlogPostMutation, useGetUploadImageUrlMutation } from "@/state/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import BlogEditor from "@/components/BlogEditor";
import ImageUploader from "@/components/ImageUploader";
import { uploadBlogImage } from "@/lib/utils";

export default function NewBlogPostPage() {
  const router = useRouter();
  const { user } = useUser();
  const [createPost, { isLoading }] = useCreateBlogPostMutation();
  const [getUploadImageUrl] = useGetUploadImageUrlMutation();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Auto-generate slug từ title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(autoSlug);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !slug) {
      toast.error("Vui lòng nhập tiêu đề và slug");
      return;
    }

    try {
      setUploading(true);
      let coverImageUrl = "";
      
      // Upload ảnh nếu có
      if (coverImage) {
        coverImageUrl = await uploadBlogImage(slug, coverImage, getUploadImageUrl);
      }

      const authorId = user?.id || "";
      const authorName = [user?.firstName, user?.lastName]
        .filter(Boolean)
        .join(" ");

      const payload = {
        title,
        slug,
        excerpt,
        coverImageUrl,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        content,
        published,
        authorId,
        authorName,
      };

      await createPost(payload).unwrap();
      toast.success("Đã tạo bài viết thành công!");
      router.push(`/blog/${slug}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Tạo bài viết thất bại");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Viết bài blog mới</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div>
              <Label htmlFor="title">Tiêu đề bài viết *</Label>
              <Input
                id="title"
                placeholder="Nhập tiêu đề bài viết..."
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Đường dẫn (slug) *</Label>
              <Input
                id="slug"
                placeholder="duong-dan-bai-viet"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Mô tả ngắn</Label>
              <Textarea
                id="excerpt"
                rows={3}
                placeholder="Tóm tắt ngắn gọn về nội dung bài viết..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="tags">Thẻ tag (cách nhau bằng dấu phẩy)</Label>
              <Input
                id="tags"
                placeholder="react, nextjs, javascript, web development"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div>
            <ImageUploader
              value={coverImage}
              onChange={setCoverImage}
              label="Ảnh bìa bài viết"
            />
          </div>
        </div>

        <div>
          <Label>Nội dung bài viết *</Label>
          <BlogEditor value={content} onChange={setContent} />
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">
              <span className={published ? "text-green-600" : "text-yellow-600"}>
                {published ? "Xuất bản ngay" : "Lưu bản nháp"}
              </span>
            </Label>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/blog")}
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || uploading}
              className="min-w-[140px]"
            >
              {uploading ? "Đang upload..." : 
               isLoading ? "Đang lưu..." : 
               published ? "Xuất bản bài viết" : "Lưu bản nháp"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
