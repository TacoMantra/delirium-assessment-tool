import { redirect } from '@remix-run/node';
import { prisma } from '~/db/prisma';

export default async function getPatientsByAccountId(
    accountId: string,
    skip?: number,
    take?: number
) {
    try {
        const patients = await prisma.patient.findMany({
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
        });

        return patients;
    } catch {
        return redirect(`/home`);
    }
}
