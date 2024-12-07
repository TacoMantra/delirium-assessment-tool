import accountExists from '~/queries/accountExists';

/**
 * Validates the input for signing up a new user, including their email and password.
 *
 * This function checks that the email is non-empty, includes an "@" symbol, and ensures the
 * password is non-empty. It also verifies if an account already exists with the provided email.
 *
 * @param {string} email - The email address of the user attempting to sign up.
 * @param {string} password - The password the user wishes to set for their account.
 *
 * @returns {Object|null} Returns an object with error messages for invalid fields, or null if inputs are valid.
 * @returns {string} [errors.email] - Error message for an invalid email address or an existing account.
 * @returns {string} [errors.password] - Error message for an empty password.
 */
export default async function validateSignup(email: string, password: string) {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
        errors.email = 'Email is required.';
    } else if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
        errors.password = 'Password is required.';
    }

    if (password.length <= 8) {
        errors.password = 'Password must be at least 8 characters.';
    }

    if (!errors.email && (await accountExists(email))) {
        errors.email = 'An account with this email already exists.';
    }

    return Object.keys(errors).length ? errors : null;
}
