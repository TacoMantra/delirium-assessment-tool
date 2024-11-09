import { prisma } from '~/db/prisma';
import RiskAssessmentType from '~/terms/riskAssessment';

/**
 * The Confusion Assessment Method (CAM) Diagnostic Algorithm.
 * Referenced from: https://www.va.gov/covidtraining/docs/The_Confusion_Assessment_Method.pdf
 *
 * This algorithm includes four key features to assess delirium:
 *
 * **Feature 1: Acute Onset or Fluctuating Course**
 * - Obtained from a family member or nurse, this feature is indicated by positive responses to the following:
 *   - Is there evidence of an acute change in mental status from the patient’s baseline?
 *   - Did the abnormal behavior fluctuate during the day (come and go, or increase and decrease in severity)?
 *
 * **Feature 2: Inattention**
 * - This is shown by a positive response to the question:
 *   - Did the patient have difficulty focusing attention, such as being easily distractible or having trouble keeping track of what was being said?
 *
 * **Feature 3: Disorganized Thinking**
 * - Indicated by a positive response to the question:
 *   - Was the patient’s thinking disorganized or incoherent, such as with rambling or irrelevant conversation, unclear or illogical ideas, or unpredictable topic changes?
 *
 * **Feature 4: Altered Level of Consciousness**
 * - Shown by any answer other than “alert” to the question:
 *   - Overall, how would you rate this patient’s level of consciousness? (Alert [normal], vigilant [hyperalert], lethargic [drowsy, easily aroused], stupor [difficult to arouse], or coma [unarousable])
 *
 * To diagnose delirium, CAM requires the presence of Features 1 and 2, as well as either Feature 3 or Feature 4.
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
