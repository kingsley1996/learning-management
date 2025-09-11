"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetBlogPostBySlugQuery } from "@/state/api";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "isomorphic-dompurify";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const { data: post, isLoading } = useGetBlogPostBySlugQuery(slug, {
    skip: !slug,
  });

  if (isLoading) return <div className="p-6">Đang tải...</div>;
  if (!post) return <div className="p-6">Không tìm thấy bài viết.</div>;

  // Sanitize HTML content từ React-Quill
  const sanitizedContent = DOMPurify.sanitize(post.content || "");

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight mb-4">{post.title}</h1>
        
        {/* Excerpt/Description */}
        {post.excerpt && (
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-4">
          {post.authorName && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {post.authorName}
            </span>
          )}
          
          {post.createdAt && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {new Date(post.createdAt).toLocaleDateString('vi-VN')}
            </span>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <div className="relative w-full h-80 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content từ React-Quill */}
      <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
        <div 
          className="ql-editor"
          dangerouslySetInnerHTML={{ 
            __html: sanitizedContent 
          }}
        />
      </div>

      {/* Custom CSS cho Quill content */}
      <style jsx global>{`
        .ql-editor {
          padding: 0 !important;
          border: none !important;
          font-family: inherit;
          line-height: 1.7;
        }
        
        .ql-editor h1, .ql-editor h2, .ql-editor h3, 
        .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .ql-editor h1 { font-size: 2rem; }
        .ql-editor h2 { font-size: 1.75rem; }
        .ql-editor h3 { font-size: 1.5rem; }
        .ql-editor h4 { font-size: 1.25rem; }
        
        .ql-editor p {
          margin-bottom: 1rem;
          text-align: justify;
        }
        
        .ql-editor ul, .ql-editor ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .ql-editor li {
          margin-bottom: 0.5rem;
        }
        
        .ql-editor blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 0.375rem;
        }
        
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem auto;
          display: block;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .ql-editor a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .ql-editor a:hover {
          color: #1d4ed8;
        }
        
        .ql-editor code {
          background: #f1f5f9;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.875em;
        }
        
        .ql-editor pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        /* Dark mode styles */
        .dark .ql-editor blockquote {
          background: #1e293b;
          border-left-color: #475569;
        }
        
        .dark .ql-editor code {
          background: #374151;
          color: #e5e7eb;
        }
      `}</style>
    </article>
  );
}
