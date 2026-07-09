/**
 * Resolves the correct absolute URL for media assets (images, uploads, etc.) dynamically.
 * Handles full URLs, blob preview URLs, and relative backend upload paths.
 * 
 * @param path The relative path or URL of the media asset (e.g. background.imageUrl)
 * @param fullImageUrl An optional fallback absolute URL (e.g. background.fullImageUrl)
 * @returns The resolved absolute URL string, or an empty string if no path is provided
 */
export function getMediaUrl(
  path?: string | null,
  fullImageUrl?: string | null
): string {
  if (fullImageUrl) {
    return fullImageUrl;
  }

  if (!path) {
    return "";
  }

  if (path.startsWith("http") || path.startsWith("blob:")) {
    return path;
  }

  // Dynamically extract host from environment variables (Next.js config or fallback)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  const hostUrl = apiUrl.replace(/\/api$/, "");

  const cleanPath = path.replace(/^\/+/, "");

  if (cleanPath.startsWith("uploads/")) {
    return `${hostUrl}/${cleanPath}`;
  }
  if (cleanPath.startsWith("media/")) {
    return `${hostUrl}/${cleanPath}`;
  }

  return `${hostUrl}/media/uploads/${cleanPath}`;
}
