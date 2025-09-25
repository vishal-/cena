/**
 * Utility function to safely extract error messages from unknown error types
 * @param error - The error object (can be any type)
 * @returns A string representation of the error message
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

/**
 * Utility function to create error notification messages with consistent formatting
 * @param prefix - The prefix text (e.g., "Error saving dish")
 * @param error - The error object
 * @returns Formatted error message
 */
export const formatErrorMessage = (prefix: string, error: unknown): string => {
    return `${prefix}: ${getErrorMessage(error)}`;
};

/**
 * Utility function to get error message with a fallback
 * @param error - The error object
 * @param fallback - Fallback message if error doesn't have a message
 * @returns Error message or fallback
 */
export const getErrorMessageWithFallback = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return fallback;
};