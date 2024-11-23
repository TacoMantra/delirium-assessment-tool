import { prisma } from '~/db/prisma';

/**
 * Indicates whether an account with the provided email address exists.
 *
 * @param {string} email - The email address to check.
 * @returns {Promise<Boolean>} Whether an account with the provided email address exists.
 */
export default async function accountExists(email: string) {
    const account = await prisma.account.findUnique({
        where: { email: email },
        select: { id: true },
    });

    return Boolean(account);
}
