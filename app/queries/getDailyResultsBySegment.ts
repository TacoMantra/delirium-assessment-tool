import dayjs from 'dayjs';
import { prisma } from '~/db/prisma';

/**
 * Retrieves and aggregates daily results data segmented by risk type, gender, and age group.
 *
 * This function performs a `groupBy` query to aggregate daily results for a specified number of days.
 * It enriches the grouped data by fetching the corresponding names for risk types, genders, and age groups.
 *
 * @param {number} [days=30] - The number of days to look back for daily results. Defaults to 30.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of aggregated results.
 * Each result object includes:
 * - `riskType` (string | null): The name of the risk type.
 * - `gender` (string | null): The name of the gender.
 * - `ageGroup` (string | null): The name of the age group.
 * - `count` (number): The sum of counts for the specified segment.
 * @throws {Error} Throws an error if the database operations fail.
 */
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
