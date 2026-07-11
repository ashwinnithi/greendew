/**
 * RFC-compliant email regex.
 * Validates the email address structure per RFC 5322 specifications.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Validates that the input is a valid email address.
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates that the input is a valid phone number.
 * Allows digits, optional leading plus, spaces, dashes, and parentheses.
 * Must be between 7 and 20 characters.
 */
export function validatePhone(phone: string): boolean {
  const trimmed = phone.trim();
  return /^\+?[0-9\s\-()]{7,20}$/.test(trimmed);
}

/**
 * Checks if the string is empty after trimming.
 */
export function isEmpty(val: string): boolean {
  return val.trim().length === 0;
}

/**
 * Trims leading and trailing whitespace from a value.
 */
export function trimValue(val: string): string {
  return val.trim();
}
