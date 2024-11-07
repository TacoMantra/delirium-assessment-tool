import { prisma } from '~/db/prisma';

export default async function getHomeData(userId: string) {
    return prisma.patient.findMany({
        where: {
            accountId: userId,
        },
    });
}
