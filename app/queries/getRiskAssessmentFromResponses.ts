import { prisma } from '~/db/prisma';
import RiskAssessmentType from '~/terms/riskAssessment';

/**
 * Evaluates the patient's risk of delirium based on their responses to a set of questions and categories.
 *
 * This function implements the Confusion Assessment Method (CAM) diagnostic algorithm to assess the risk of delirium.
 * It checks for the presence of four key features: Acute Onset or Fluctuating Course, Inattention, Disorganized Thinking,
 * and Altered Level of Consciousness. The presence of these features determines whether the patient is at risk, has one or
 * more risk factors, or has no risk. The function returns a corresponding risk assessment type based on the patient's responses.
 *
 * **CAM Diagnostic Algorithm:**
 * - **Feature 1 (Acute Onset or Fluctuating Course)**: Assessed based on responses about the patient's mental status and behavior.
 * - **Feature 2 (Inattention)**: Assessed based on whether the patient had difficulty focusing attention.
 * - **Feature 3 (Disorganized Thinking)**: Assessed based on whether the patient's thinking was disorganized or incoherent.
 * - **Feature 4 (Altered Level of Consciousness)**: Assessed based on the patient's level of consciousness, with answers other than "alert" indicating potential altered consciousness.
 *
 * To diagnose delirium, Features 1 and 2 must both be present, along with either Feature 3 or Feature 4. If the patient meets
 * this criteria, they are diagnosed with a positive delirium diagnosis. If only two or more features are present, they are at
 * risk for delirium. If one or more features are present, they have one or more risk factors. Otherwise, the patient is deemed
 * to have no risk of delirium.
 *
 * @param {string} patientId - The ID of the patient whose responses are being evaluated.
 * @returns {Promise<keyof typeof RiskAssessmentType>} The risk assessment result:
 * - `'positiveDiagnosis'`: Patient is diagnosed with delirium.
 * - `'atRisk'`: Patient is at risk for delirium.
 * - `'oneOrMoreRiskFactors'`: Patient has one or more risk factors for delirium.
 * - `'noRisk'`: Patient has no risk of delirium.
 * @throws {Error} Throws an error if there is an issue evaluating the patient's responses or fetching the data.
 */
export default async function getRiskAssessmentFromResponses(
    patientId: string
) {
    const patientResponses = await prisma.patientResponse.findMany({
        where: { patientId },
        include: {
            question: {
                include: {
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            responseOption: true,
        },
    });

    const isPositiveResponse = (response: string) => response === 'Yes';

    const feature1Present =
        patientResponses.filter(
            (response) =>
                response?.question?.category?.name === 'alteredConsciousness' &&
                response?.responseOption?.responsevalue !== 'Alert'
        )?.length > 0;

    const feature2Present =
        patientResponses.filter(
            (response) =>
                response?.question?.category?.name === 'inattention' &&
                isPositiveResponse(response?.responseOption?.responsevalue)
        )?.length > 0;

    const feature3Present =
        patientResponses.filter(
            (response) =>
                response?.question?.category?.name === 'disorganizedThinking' &&
                isPositiveResponse(response?.responseOption?.responsevalue)
        )?.length > 0;

    const feature4Present =
        patientResponses.filter(
            (response) =>
                response?.question?.category?.name === 'acuteOrFluctuating' &&
                isPositiveResponse(response?.responseOption?.responsevalue)
        )?.length > 0;

    if (
        feature1Present &&
        feature2Present &&
        (feature3Present || feature4Present)
    ) {
        return 'positiveDiagnosis' as keyof typeof RiskAssessmentType;
    }

    if (
        [
            feature1Present,
            feature2Present,
            feature3Present,
            feature4Present,
        ].filter(Boolean).length >= 2
    ) {
        return 'atRisk' as keyof typeof RiskAssessmentType;
    }

    if (
        [
            feature1Present,
            feature2Present,
            feature3Present,
            feature4Present,
        ].filter(Boolean).length >= 1
    ) {
        return 'oneOrMoreRiskFactors' as keyof typeof RiskAssessmentType;
    }

    return 'noRisk' as keyof typeof RiskAssessmentType;
}
