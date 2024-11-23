import crypto from 'crypto';
import { prisma } from '~/db/prisma';

/**
 * Authenticates a user by verifying their email and password.
 *
 * This function checks if the provided email exists in the database, retrieves the corresponding password hash,
 * and compares it with the hash of the provided password. The password is hashed using the `pbkdf2Sync` function
 * with a salt stored in the database, and if the hashes match, the user is authenticated. If the email does not exist
 * or the password is incorrect, the function returns `false`. If the authentication is successful, it returns the
 * user's ID.
 *
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The password provided by the user for authentication.
 * @returns {Promise<string | boolean>} The user's ID if the login is successful; `false` if the login fails.
 * @throws {Error} Throws an error if there is an issue querying the database or processing the password.
 */
export default async function login(email: string, password: string) {
    const user = await prisma.account.findUnique({
        where: { email: email },
        include: { password: true },
    });

    if (!user || !user.password) {
        return false;
    }

    const hash = crypto
        .pbkdf2Sync(password, user.password.salt, 1000, 64, 'sha256')
        .toString('hex');

    if (hash !== user.password.hash) {
        return false;
    }

    return user.id;
}
