import { prisma } from '~/db/prisma';

/**
 * Retrieves a list of patients associated with a specific account ID, with optional pagination.
 *
 * This function fetches patient records ordered by creation date and last name, along with related data such as gender,
 * responses to questions, and risk assessments. It also returns the total number of patients for the given account ID.
 * Pagination is optional, controlled by the `skip` and `take` parameters.
 *
 * @param {string} accountId - The ID of the account whose patients are to be retrieved.
 * @param {number} [skip=0] - The number of patients to skip for pagination. Defaults to 0 if not provided.
 * @param {number} [take=100] - The number of patients to fetch. Defaults to 100 if not provided.
 * @returns {Promise<Array<Array<Object>>>} A promise that resolves to an array with two elements:
 * - An array of patient objects, where each object includes:
 *     - `gender` (string): The gender of the patient.
 *     - `patientResponse` (Array<Object>): A list of responses to questions, each containing:
 *         - `responseOption` (Object): The response value for the answer.
 *         - `question` (Object): The title of the question.
 *     - `riskAssessment` (Array<Object>): A list of risk assessments, each containing:
 *         - `risktype` (Object): The type of risk.
 * - A count of the total number of patients associated with the provided account ID.
 * @throws {Error} Throws an error if the database query fails.
 */
export default async function getPatientsByAccountId(
    accountId: string,
    skip?: number,
    take?: number
) {
    const results = await Promise.all([
        prisma.patient.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
                {
                    lastname: 'desc',
                },
            ],
            skip: skip ?? 0,
            take: take ?? 100,
            where: { accountId },
            include: {
                gender: {
                    select: {
                        gender: true,
                    },
                },
                patientResponse: {
                    select: {
                        responseOption: {
                            select: {
                                responsevalue: true,
                            },
                        },
                        question: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
                riskAssessment: {
                    select: {
                        risktype: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        }),
        prisma.patient.count(),
    ]);

    return results;
}
