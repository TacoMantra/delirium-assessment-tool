import { prisma } from '~/db/prisma';

export default async function accountExists(email: string) {
    const account = await prisma.account.findUnique({
        where: { email: email },
        select: { id: true },
    });

    return Boolean(account);
}
