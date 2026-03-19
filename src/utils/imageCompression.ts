export interface CompressionOptions {
  maxWidthOrHeight?: number;
  quality?: number; // 0 to 1
  maxSizeMB?: number;
}

/**
 * Compresses an image file using HTML Canvas and returns a base64 encoded string.
 * This is crucial for bypassing Vercel's strict 4.5MB Serverless Function payload limit.
 */
export const compressImageToBase64 = (
  file: File,
  { maxWidthOrHeight = 1200, quality = 0.7, maxSizeMB = 0.8 }: CompressionOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 1. Initial size check (Optional fail-safe if file is astronomically large, e.g. > 15MB)
    if (file.size / 1024 / 1024 > 15) {
      reject(new Error(`Το αρχείο είναι πολύ μεγάλο (${(file.size / 1024 / 1024).toFixed(1)}MB). Παρακαλώ επιλέξτε αρχείο μικρότερο από 15MB.`));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let { width, height } = img;

        // 2. Resize maintaining aspect ratio
        if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
          if (width > height) {
            height = Math.round((height * maxWidthOrHeight) / width);
            width = maxWidthOrHeight;
          } else {
            width = Math.round((width * maxWidthOrHeight) / height);
            height = maxWidthOrHeight;
          }
        }

        // 3. Draw on Canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error("A canvas context could not be created."));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // 4. Compress to JPEG/WEBP
        // Use JPEG as default for photos to strip out transparency and reduce size efficiently.
        let mimeType = file.type === 'image/png' ? 'image/jpeg' : file.type;
        // Fallback to jpeg if the browser doesn't know the mime type
        if (!mimeType) mimeType = 'image/jpeg';

        let compressedBase64 = canvas.toDataURL(mimeType, quality);

        // 5. Check if resulting base64 is within limits (approximation: base64 size * 0.75 = bytes)
        let approxSizeMB = (compressedBase64.length * 0.75) / (1024 * 1024);
        
        // Loop down quality if it's still too big
        let currentQuality = quality;
        while (approxSizeMB > maxSizeMB && currentQuality > 0.3) {
            currentQuality -= 0.1;
            compressedBase64 = canvas.toDataURL(mimeType, currentQuality);
            approxSizeMB = (compressedBase64.length * 0.75) / (1024 * 1024);
        }

        if (approxSizeMB > maxSizeMB) {
            reject(new Error(`Ακόμα και μετά την συμπίεση, η εικόνα υπερβαίνει το επιτρεπόμενο όριο. Συμπιεσμένο: ${approxSizeMB.toFixed(2)}MB`));
        } else {
            resolve(compressedBase64);
        }
      };
      img.onerror = (err) => reject(new Error("Failed to load image for compression. " + err));
    };
    reader.onerror = (error) => reject(error);
  });
};
