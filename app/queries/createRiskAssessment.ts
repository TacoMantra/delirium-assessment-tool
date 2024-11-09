import { prisma } from '~/db/prisma';
import RiskAssessmentType from '~/terms/riskAssessment';

export default async function createRiskAssessment(
    patientId: string,
    riskAssessmentType: keyof typeof RiskAssessmentType
) {
    try {
        const riskType = await prisma.riskType.findUnique({
            where: { name: riskAssessmentType },
            select: { id: true },
        });

        if (!riskType) {
            throw new Error(
                `RiskType with name "${riskAssessmentType}" not found.`
            );
        }

        const riskAssessment = await prisma.riskAssessment.create({
            data: {
                patientId,
                riskTypeId: riskType.id,
            },
        });

        console.log('RiskAssessment created:', riskAssessment);
        return riskAssessment;
    } catch (error) {
        console.error('Error creating RiskAssessment:', error);
        throw error;
    }
}
