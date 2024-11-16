import { prisma } from '~/db/prisma';

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
