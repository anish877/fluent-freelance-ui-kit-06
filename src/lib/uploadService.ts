interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    publicId: string;
    format: string;
    size: number;
    width?: number;
    height?: number;
  };
}

interface MultipleUploadResponse {
  success: boolean;
  data: Array<{
    url: string;
    publicId: string;
    format: string;
    size: number;
    width?: number;
    height?: number;
  }>;
}

class UploadService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  }

  /**
   * Upload a single file to Cloudinary
   */
  async uploadSingle(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseURL}/upload/single`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  /**
   * Upload multiple files to Cloudinary
   */
  async uploadMultiple(files: File[]): Promise<MultipleUploadResponse> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${this.baseURL}/upload/multiple`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  /**
   * Delete a file from Cloudinary
   */
  async deleteFile(publicId: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseURL}/upload/${publicId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return response.json();
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { isValid: false, error: 'File size must be less than 10MB' };
    }

    // Check file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf'
    ];

    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Only images (JPG, PNG, GIF, WebP, SVG) and PDF files are allowed' 
      };
    }

    return { isValid: true };
  }

  /**
   * Convert file to base64 (for preview purposes)
   */
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  /**
   * Get file extension from filename
   */
  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  /**
   * Check if file is an image
   */
  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Check if file is a PDF
   */
  isPDF(file: File): boolean {
    return file.type === 'application/pdf';
  }
}

export const uploadService = new UploadService();
export default uploadService; 