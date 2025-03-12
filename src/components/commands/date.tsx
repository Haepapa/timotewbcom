/**
 * Returns a string with the current date and time.
 *
 * This default exported function creates a new Date instance and formats it using the locale's string representation,
 * prefixing the result with "Current date:".
 *
 * @returns A formatted string representing the current date and time.
 */
export default function date() {
  return `Current date: ${new Date().toLocaleString()}`;
}
