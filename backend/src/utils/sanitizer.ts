export const sanitizeUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    // Strip query parameters to remove potential PII/tokens
    parsedUrl.search = '';
    parsedUrl.hash = '';
    return parsedUrl.toString();
  } catch (error) {
    // If URL parsing fails, return the original or a generic placeholder
    return url;
  }
};
