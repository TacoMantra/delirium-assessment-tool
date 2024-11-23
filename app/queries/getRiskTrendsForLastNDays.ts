import { prisma } from '~/db/prisma';

export type AreaChartItem = {
    name: string; // The date property
} & Record<string, number>; // Ensures dynamic properties are of type number

/**
 * Fetches daily results for a given number of days, grouped by date and risk type,
 * and formats the data for a stacked bar chart.
 *
 * @param {number} days The number of days of data to fetch, e.g., 30 for the last 30 days.
 * @returns {Promise<Array<{ name: string, [key: string]: number }>>} A promise that resolves to an array of formatted data
 *   where each object represents a date with risk types as keys and their respective counts as values.
 */
const getRiskTrendsForLastNDays = async (days: number = 30) => {
    // Fetch daily results for the given number of days, including risk type names
    const data = await prisma.dailyResults.findMany({
        where: {
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - days)), // Last `days` days
            },
        },
        include: {
            RiskType: true, // Join with the RiskType model to get the name
        },
        orderBy: {
            createdAt: 'asc', // Order by date
        },
    });

    const formattedData = data.reduce<AreaChartItem[]>((acc, result) => {
        // Convert the date to YYYY-MM-DD format for consistency
        const dateStr = result.createdAt.toISOString().split('T')[0];

        // Get the name of the risk type
        const riskTypeName = result.RiskType.name;

        // Get the count for the result, ensuring it's treated as a number
        const count: number = Number(result.count); // Ensure count is a number

        // Find or create the data entry for this date
        const existingData = acc.find((item) => item.name === dateStr);

        if (!existingData) {
            // If no entry for this date, create it with the risk type count
            // @ts-expect-error this is typed correctly
            acc.push({
                name: dateStr,
                [riskTypeName]: count, // Set the count for this risk type name
            });
        } else {
            // If the entry exists, sum the counts for the same date and risk type
            existingData[riskTypeName] =
                (existingData[riskTypeName] || 0) + count;
        }

        return acc;
    }, []);

    return formattedData;
};

export default getRiskTrendsForLastNDays;
