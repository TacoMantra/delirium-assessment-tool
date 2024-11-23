import { redirect } from '@remix-run/node';
import { prisma } from '~/db/prisma';
import getRiskAssessmentFromResponses from './getRiskAssessmentFromResponses';
import createRiskAssessment from './createRiskAssessment';

/**
 * Retrieves a question based on its order or creates a risk assessment if no more questions are left.
 *
 * This function first checks if there are remaining questions to be answered by counting the total number of questions
 * and comparing the provided `order` with the count. If there are more questions, it fetches the question based on the
 * given order along with its associated answer format and category. If no questions are left to answer, it triggers the
 * creation of a risk assessment based on the patient's responses and then redirects to the patient's summary page.
 *
 * @param {number} order - The order number of the question to retrieve.
 * @param {string} patientId - The ID of the patient whose question is being fetched.
 * @returns {Promise<Object|Redirect>} A promise that resolves to:
 * - A question object if more questions are available. The object contains:
 *     - `answerFormat` (Object): The format of the answer for this question.
 *     - `category` (Object): The category to which the question belongs.
 * - A redirect to the patient’s summary page if no questions are left.
 * @throws {Error} Throws an error if there is an issue fetching the question or creating the risk assessment.
 */
export default async function getQuestionByOrder(
    order: number,
    patientId: string
) {
    try {
        const count = await prisma.question.count();

        if (order < count - 1) {
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
        } else {
            // No questions left to answer, create a risk assessment and navigate to patient summary
            const riskAssessment = await getRiskAssessmentFromResponses(
                patientId
            );
            await createRiskAssessment(patientId, riskAssessment);
            return redirect(`/patients/${patientId}`);
        }
    } catch {
        return redirect(`/patients/${patientId}`);
    }
}
