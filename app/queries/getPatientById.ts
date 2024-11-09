import { redirect } from '@remix-run/node';
import { prisma } from '~/db/prisma';

export default async function getPatientById(id: string, userId: string) {
    try {
        const patient = await prisma.patient.findUniqueOrThrow({
            where: { id },
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

        if (patient.accountId !== userId) {
            throw new Error('User is not permitted to view this patient');
        }

        return patient;
    } catch {
        return redirect(`/home`);
    }
}
