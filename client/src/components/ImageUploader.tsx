// components/ImageUploader.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, ImageIcon } from "lucide-react";
import { validateImageFile } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string | File | null;
  onChange: (file: File | null) => void;
  currentImageUrl?: string;
  label?: string;
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  currentImageUrl,
  label = "Ảnh bìa",
  className = ""
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    onChange(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview("");
  };

  const displayImage = preview || currentImageUrl;

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-sm font-medium">{label}</Label>
      
      {displayImage ? (
        <div className="relative inline-block">
          <Image
            src={displayImage}
            width={400}
            height={250}
            alt="Blog cover"
            className="rounded-lg object-cover border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Kéo thả ảnh vào đây hoặc</p>
          
          <Input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            id="image-upload"
          />
          <Label
            htmlFor="image-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Chọn ảnh
          </Label>
          
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG, WebP, GIF tối đa 5MB
          </p>
        </div>
      )}

      {value instanceof File && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <p><strong>Tên file:</strong> {value.name}</p>
          <p><strong>Kích thước:</strong> {(value.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
}
