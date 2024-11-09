import { redirect } from '@remix-run/node';
import { prisma } from '~/db/prisma';
import getRiskAssessmentFromResponses from './getRiskAssessmentFromResponses';
import createRiskAssessment from './createRiskAssessment';

export default async function getQuestionByOrder(
    order: number,
    patientId: string
) {
    try {
        const question = await prisma.question.findUniqueOrThrow({
            where: {
                order,
            },
            include: {
                answerFormat: true,
                category: true,
            },
        });

        return question;
    } catch {
        // No questions left to answer, create a risk assessment and navigate to patient summary
        const riskAssessment = await getRiskAssessmentFromResponses(patientId);
        await createRiskAssessment(patientId, riskAssessment);
        return redirect(`/patients/${patientId}`);
    }
}
