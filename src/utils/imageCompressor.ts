/**
 * Utility for client-side image compression and resizing.
 * Automatically downscales large camera/phone photos to crisp, web-optimized dimensions
 * and converts to high-quality JPEG/WebP to prevent storage quota limits.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export async function compressImageFile(
  file: File | Blob,
  options: CompressionOptions = {}
): Promise<{ dataUrl: string; originalSize: number; compressedSize: number; width: number; height: number }> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.88,
    format = 'image/jpeg'
  } = options;

  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Gagal membaca file gambar'));

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memuat format gambar'));

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Gagal menginisialisasi canvas context'));
          return;
        }

        // Apply smooth high-quality interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw white background in case of transparent png converted to jpeg
        if (format === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        try {
          const compressedDataUrl = canvas.toDataURL(format, quality);
          // Estimate compressed size from base64 string
          const compressedSize = Math.round((compressedDataUrl.length * 3) / 4);

          resolve({
            dataUrl: compressedDataUrl,
            originalSize,
            compressedSize,
            width,
            height
          });
        } catch (err) {
          // Fallback to original read if canvas export fails
          resolve({
            dataUrl: e.target?.result as string,
            originalSize,
            compressedSize: originalSize,
            width: img.width,
            height: img.height
          });
        }
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Optimizes an existing base64 Data URL or remote image if needed
 */
export async function optimizeDataUrl(
  dataUrl: string,
  options: CompressionOptions = {}
): Promise<string> {
  // If it's already a small string or not a large base64, return as is
  if (!dataUrl.startsWith('data:image/') || dataUrl.length < 500000) {
    return dataUrl;
  }

  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.88,
    format = 'image/jpeg'
  } = options;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      try {
        const result = canvas.toDataURL(format, quality);
        resolve(result);
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
