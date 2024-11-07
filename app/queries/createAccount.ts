import crypto from 'crypto';

import { prisma } from '~/db/prisma';

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
