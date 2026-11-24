/**
 * Google Drive Asset Transformer
 * Converts various Google Drive share URLs into fast, direct high-resolution image CDN links.
 */

export function parseGoogleDriveFileId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If already a bare file ID
  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex matches:
  // - https://drive.google.com/file/d/FILE_ID/view
  // - https://drive.google.com/open?id=FILE_ID
  // - https://drive.google.com/uc?id=FILE_ID
  const match = trimmed.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/);
  return match ? match[1] : null;
}

export function getDriveImageUrl(urlOrId: string, width = 1600): string {
  if (!urlOrId) return '/assets/placeholder-couple.jpg';
  
  // If it's already a relative path or non-drive image URL, return as-is
  if (urlOrId.startsWith('/') || (!urlOrId.includes('drive.google.com') && !urlOrId.includes('drive.usercontent.google.com'))) {
    return urlOrId;
  }

  const fileId = parseGoogleDriveFileId(urlOrId);
  if (!fileId) return urlOrId;

  // Google User Content CDN endpoint: High-speed, cached, supports width scaling
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}
