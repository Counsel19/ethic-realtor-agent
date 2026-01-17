"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileChange?: (file: File | null) => void;
  onMultipleFileChange?: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  label?: string;
  description?: string;
  multiple?: boolean;
}

export function FileUpload({
  onFileChange,
  onMultipleFileChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  label,
  description = "SVG, PNG, JPG or GIF (max. 800x400px)",
  multiple = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (multiple && onMultipleFileChange) {
      const validFiles = droppedFiles.filter((f) => f.size <= maxSize);
      if (validFiles.length !== droppedFiles.length) {
        alert(`Some files exceed ${maxSize / 1024 / 1024}MB`);
      }
      onMultipleFileChange(validFiles);
    } else if (droppedFiles[0]) {
      handleFileSelect(droppedFiles[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > maxSize) {
      alert(`File size exceeds ${maxSize / 1024 / 1024}MB`);
      return;
    }
    setFile(selectedFile);
    onFileChange?.(selectedFile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (multiple && selectedFiles && onMultipleFileChange) {
      const filesArray = Array.from(selectedFiles);
      const validFiles = filesArray.filter((f) => f.size <= maxSize);
      if (validFiles.length !== filesArray.length) {
        alert(`Some files exceed ${maxSize / 1024 / 1024}MB`);
      }
      onMultipleFileChange(validFiles);
    } else if (selectedFiles?.[0]) {
      handleFileSelect(selectedFiles[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50",
          file && "border-primary bg-primary/5"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          multiple={multiple}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          {file && (
            <p className="text-sm font-medium text-foreground mt-2">
              {file.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
