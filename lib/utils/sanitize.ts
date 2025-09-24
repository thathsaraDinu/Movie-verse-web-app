/**
 * Utility functions to sanitize data and prevent PII disclosure
 */

// Credit card number patterns (various formats)
const CREDIT_CARD_PATTERNS = [
  // Standard format with spaces/dashes (4-4-4-4)
  /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g,
  // American Express format (4-6-5)
  /\b\d{4}[\s\-]?\d{6}[\s\-]?\d{5}\b/g,
  // Diners Club format (4-6-4)
  /\b\d{4}[\s\-]?\d{6}[\s\-]?\d{4}\b/g,
  // Any consecutive 13-19 digits (common card number lengths)
  /\b\d{13,19}\b/g,
];

// SSN patterns
const SSN_PATTERNS = [
  // Standard SSN format (XXX-XX-XXXX)
  /\b\d{3}[\s\-]?\d{2}[\s\-]?\d{4}\b/g,
];

// Phone number patterns (US format)
const PHONE_PATTERNS = [
  // (XXX) XXX-XXXX or XXX-XXX-XXXX
  /\b\(?(\d{3})\)?[\s\-]?\d{3}[\s\-]?\d{4}\b/g,
];

// Email patterns (basic)
const EMAIL_PATTERNS = [
  // Basic email pattern
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
];

// Bank routing number patterns
const ROUTING_NUMBER_PATTERNS = [
  // 9-digit routing numbers
  /\b\d{9}\b/g,
];

/**
 * Sanitizes text by removing or masking PII data
 * @param text - The text to sanitize
 * @param mask - Whether to mask the data (true) or remove it completely (false)
 * @returns Sanitized text
 */
export function sanitizeText(
  text: string | null | undefined,
  mask: boolean = true
): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  let sanitized = text;
  const replacement = mask ? "[REDACTED]" : "";

  // Remove credit card numbers
  CREDIT_CARD_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, replacement);
  });

  // Remove SSNs
  SSN_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, replacement);
  });

  // Remove phone numbers
  PHONE_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, replacement);
  });

  // Remove emails
  EMAIL_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, replacement);
  });

  // Remove routing numbers
  ROUTING_NUMBER_PATTERNS.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, replacement);
  });

  // Clean up multiple spaces and trim
  sanitized = sanitized.replace(/\s+/g, " ").trim();

  return sanitized;
}

/**
 * Validates if text contains potential PII
 * @param text - The text to validate
 * @returns true if PII is detected, false otherwise
 */
export function containsPII(text: string | null | undefined): boolean {
  if (!text || typeof text !== "string") {
    return false;
  }

  const allPatterns = [
    ...CREDIT_CARD_PATTERNS,
    ...SSN_PATTERNS,
    ...PHONE_PATTERNS,
    ...EMAIL_PATTERNS,
    ...ROUTING_NUMBER_PATTERNS,
  ];

  return allPatterns.some((pattern) => pattern.test(text));
}

/**
 * Sanitizes an object by cleaning all string fields
 * @param obj - The object to sanitize
 * @param mask - Whether to mask the data (true) or remove it completely (false)
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  mask: boolean = true
): T {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const sanitized = { ...obj } as any;

  Object.keys(sanitized).forEach((key) => {
    const value = sanitized[key];

    if (typeof value === "string") {
      sanitized[key] = sanitizeText(value, mask);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "object"
          ? sanitizeObject(item, mask)
          : typeof item === "string"
          ? sanitizeText(item, mask)
          : item
      );
    } else if (value && typeof value === "object") {
      sanitized[key] = sanitizeObject(value, mask);
    }
  });

  return sanitized as T;
}

/**
 * Logs PII detection for monitoring purposes
 * @param source - Source of the data (e.g., 'TMDB-movie-details')
 * @param field - The field that contained PII
 * @param value - The original value (will be logged as [DETECTED] for security)
 */
export function logPIIDetection(
  source: string,
  field: string,
  value: string
): void {
  console.warn(
    `[PII DETECTION] Source: ${source}, Field: ${field}, Content: [DETECTED]`
  );
}
