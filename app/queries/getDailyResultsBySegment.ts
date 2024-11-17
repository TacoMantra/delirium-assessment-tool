import dayjs from 'dayjs';
import { prisma } from '~/db/prisma';

export default async function getDailyResultsBySegment(days: number = 30) {
    // Perform the groupBy query
    const groupedResults = await prisma.dailyResults.groupBy({
        by: ['riskTypeId', 'genderId', 'ageGroupId'],
        _sum: {
            count: true,
        },
        orderBy: {
            ageGroupId: 'asc',
        },
        where: {
            createdAt: { gte: dayjs().subtract(days, 'days').toDate() },
        },
    });

    // Enrich the results with related data
    const results = await Promise.all(
        groupedResults.map(async (result) => {
            const [riskType, gender, ageGroup] = await Promise.all([
                result.riskTypeId
                    ? prisma.riskType.findUnique({
                          where: { id: result.riskTypeId },
                          select: { name: true },
                      })
                    : null,
                result.genderId
                    ? prisma.gender.findUnique({
                          where: { id: result.genderId },
                          select: { gender: true },
                      })
                    : null,
                result.ageGroupId
                    ? prisma.ageGroup.findUnique({
                          where: { id: result.ageGroupId },
                          select: { name: true },
                      })
                    : null,
            ]);

            return {
                riskType: riskType?.name || null,
                gender: gender?.gender || null,
                ageGroup: ageGroup?.name || null,
                count: result?._sum?.count ?? 0,
            };
        })
    );

    return results;
}
