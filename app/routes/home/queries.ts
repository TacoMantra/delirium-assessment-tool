import { prisma } from '~/db/prisma';

export async function getHomeData(userId: string) {
    return prisma.patient.findMany({
        where: {
            accountId: userId,
        },
    });
}
