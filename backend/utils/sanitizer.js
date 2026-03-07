import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Strict configuration: Strip ALL HTML tags and attributes
const STRICT_CONFIG = { ALLOWED_TAGS: [], ALLOWED_ATTR: [] };

/**
 * Recursively sanitizes strings within an input (string, object, or array)
 * Strips all HTML tags to prevent XSS and ensure plain text.
 * 
 * @param {any} input - The data to sanitize
 * @returns {any} - The sanitized data
 */
export const sanitize = (input) => {
    // 1. Handle Strings (Base Case)
    if (typeof input === 'string') {
        return DOMPurify.sanitize(input, STRICT_CONFIG);
    }

    // 2. Handle Arrays (Recursive Case)
    if (Array.isArray(input)) {
        return input.map(item => sanitize(item));
    }

    // 3. Handle Objects (Recursive Case)
    if (input !== null && typeof input === 'object') {
        const sanitized = {};
        for (const [key, value] of Object.entries(input)) {
            sanitized[key] = sanitize(value);
        }
        return sanitized;
    }

    // 4. Return as-is for other types (boolean, number, etc.)
    return input;
};

export default sanitize;
