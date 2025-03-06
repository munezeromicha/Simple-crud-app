import { hash, compare } from 'bcryptjs';

/**
 * Hash a password
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
export async function hashPassword(password) {
    return await hash(password, 12);
}

/**
 * Verify if a password matches a hash
 * @param {string} password - The password to verify
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - True if the password matches the hash
 */
export async function verifyPassword(password, hashedPassword) {
    return await compare(password, hashedPassword);
}

/**
 * Middleware to check if user is authenticated
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 * @param {Function} next - Next.js next function
 */
export function isAuthenticated(req, res, next) {
    const session = req.session;

    if (!session || !session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = session.user;
    return next();
}

/**
 * Get the current user from session or token
 * @param {Object} req - Next.js request object
 * @returns {Object|null} - The current user or null
 */
export function getCurrentUser(req) {
    if (req.session && req.session.user) {
        return req.session.user;
    }

    return null;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if the email format is valid
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - The password to validate
 * @returns {Object} - Object containing isValid and message
 */
export function validatePassword(password) {
    if (password.length < 8) {
        return {
            isValid: false,
            message: 'Password must be at least 8 characters long'
        };
    }

    if (!/\d/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one number'
        };
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one special character'
        };
    }

    return { isValid: true };
}