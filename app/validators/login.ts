/**
 * Validates the email and password input during the login process.
 *
 * This function checks that the email is provided, contains a valid format, and that the password
 * meets the minimum length requirement. It returns an object containing error messages for invalid
 * fields, or null if no errors are found.
 *
 * @param {string} email - The email address entered by the user.
 * @param {string} password - The password entered by the user.
 *
 * @returns {Object|null} Returns an object with error messages for invalid fields, or null if inputs are valid.
 * @returns {string} [errors.email] - Error message for an invalid or missing email.
 * @returns {string} [errors.password] - Error message for an invalid or missing password.
 */
export default function validateLogin(email: string, password: string) {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
        errors.email = 'Email is required.';
    } else if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
        errors.password = 'Password is required.';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
    }

    return Object.keys(errors).length ? errors : null;
}
