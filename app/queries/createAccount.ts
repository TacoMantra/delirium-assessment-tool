import crypto from 'crypto';

import { prisma } from '~/db/prisma';

export interface IUser {
    id: string;
    email: string;
}

/**
 * Creates a new account.
 *
 * @param {string} email - The email address of the new account holder.
 * @param {string} password - The desired password of the new account holder.
 * @returns {Promise<IUser>} user - The id and email address of the newly created user.
 */
export default async function createAccount(email: string, password: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha256')
        .toString('hex');

    return prisma.account.create({
        data: {
            email: email,
            password: { create: { hash, salt } },
        },
    });
}
