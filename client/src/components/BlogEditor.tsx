// components/BlogEditor.tsx - Version không có language selector
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded" />,
});

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      hljs.configure({
        languages: [
          "javascript",
          "typescript",
          "css",
          "html",
          "python",
          "java",
          "json",
          "bash",
        ],
        ignoreUnescapedHTML: true,
      });
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
      syntax: {
        hljs: hljs,
        // Không có interval để tránh language selector
      },
    }),
    []
  );

  return (
    <div className="bg-white min-h-[400px] rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "link",
          "image",
          "video",
          "color",
          "background",
          "code-block",
        ]}
        placeholder="Nhập nội dung bài viết..."
        className="h-96"
      />

      {/* CSS để ẩn language selector và fix format */}
      <style jsx global>{`
        /* Ẩn language selector dropdown */
        /* Ẩn hoàn toàn language selector */
        .ql-code-block-container select.ql-ui,
        .ql-code-block-container .ql-picker {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -9999px !important;
          width: 0 !important;
          height: 0 !important;
        }

        /* Remove từ DOM flow */
        .ql-syntax select {
          display: none !important;
        }

        /* Clean up any residual elements */
        select[class*="ql-"] {
          display: none !important;
        }

        /* Fix code block styling without selector */
        .ql-editor .ql-code-block-container {
          margin: 16px 0;
        }

        .ql-editor .ql-code-block {
          background: linear-gradient(145deg, #0d1117 0%, #161b22 100%);
          border: 2px solid #30363d;
          border-radius: 12px;
          color: #f0f6fc;
          font-family: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
          font-size: 15px;
          line-height: 1.6;
          padding: 20px;
          margin: 2px 0;
          overflow-x: auto;
          white-space: pre-wrap;
        }

        /* First and last code block styling */
        .ql-editor .ql-code-block-container .ql-code-block:first-child {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          margin-top: 0;
        }

        .ql-editor .ql-code-block-container .ql-code-block:last-child {
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          margin-bottom: 0;
        }

        /* Middle code blocks */
        .ql-editor
          .ql-code-block-container
          .ql-code-block:not(:first-child):not(:last-child) {
          border-radius: 0;
          border-top: none;
          border-bottom: 1px solid #30363d;
        }

        /* Container styling */
        .ql-editor .ql-code-block-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        /* Add decorative elements */
        .ql-editor .ql-code-block-container::before {
          content: "";
          position: absolute;
          top: 16px;
          left: 20px;
          width: 10px;
          height: 10px;
          background: #ff5f56;
          border-radius: 50%;
          box-shadow: 18px 0 0 #ffbd2e, 36px 0 0 #27ca3f;
          z-index: 10;
        }

        /* Add "Code" label */
        .ql-editor .ql-code-block-container::after {
          content: "CODE";
          position: absolute;
          top: 12px;
          right: 20px;
          background: rgba(56, 178, 172, 0.15);
          backdrop-filter: blur(8px);
          color: #38b2ac;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid rgba(56, 178, 172, 0.2);
          z-index: 10;
        }

        /* Adjust first code block padding for decorations */
        .ql-editor .ql-code-block-container .ql-code-block:first-child {
          padding-top: 45px;
        }
      `}</style>
    </div>
  );
}
