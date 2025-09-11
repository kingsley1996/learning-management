// components/BlogEditor.tsx
import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded" />
});

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  // Đăng ký plugins nếu cần
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-quill-new').then(({ Quill }) => {
        // Đăng ký các modules tùy chỉnh ở đây
        // const ImageResize = require('quill-image-resize-module-react');
        // Quill.register('modules/imageResize', ImageResize);
      });
    }
  }, []);

  return (
    <div className="bg-white min-h-[300px]">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Nhập nội dung bài viết..."
        className="h-64"
      />
    </div>
  );
}
