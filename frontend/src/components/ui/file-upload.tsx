'use client';

import { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { Button } from './button';

interface FileUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  className?: string;
  maxSizeMB?: number;
  accept?: string;
}

export function FileUpload({
  value,
  onChange,
  className,
  maxSizeMB = 2,
  accept = 'image/*',
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      setLoading(true);

      // For this example, we'll use FileReader to get a base64 data URL
      // In a real app, you'd likely upload to a server or cloud storage
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setLoading(false);
      };

      reader.onerror = () => {
        setError('Error reading file');
        setLoading(false);
      };

      reader.readAsDataURL(file);
    },
    [maxSizeMB, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        processFile(file);
      }
    },
    [processFile],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        processFile(file);
      }
    },
    [processFile],
  );

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800',
          dragging &&
            'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20',
          loading && 'cursor-wait opacity-70',
          className,
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
          disabled={loading}
        />

        {value ? (
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              src={value}
              alt="Uploaded image"
              className="max-h-[120px] w-auto rounded-md object-contain"
              width={120}
              height={120}
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
              onClick={removeImage}
              disabled={loading}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <>
            <UploadCloud className="mb-2 h-12 w-12 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {loading
                  ? 'Processing...'
                  : 'Drag & drop an image or click to browse'}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {`PNG, JPG, GIF up to ${maxSizeMB}MB`}
              </p>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
