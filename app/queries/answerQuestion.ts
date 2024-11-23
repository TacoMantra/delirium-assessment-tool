import { prisma } from '~/db/prisma';

/**
 * Records a particular patient's response to a particular question.
 *
 * @param {string} patientId - The id of the patient.
 * @param {number} questionId - The id of the question.
 * @param {string} response - The provided response.
 */
export default async function answerQuestion(
    patientId: string,
    questionId: number,
    response: string
) {
    const responseOption = await prisma.responseOption.findUnique({
        where: { responsevalue: response },
    });

    if (!responseOption) {
        throw new Error(
            `ResponseOption with value "${response}" does not exist.`
        );
    }

    await prisma.patientResponse.upsert({
        where: {
            patientId_questionId: {
                patientId,
                questionId,
            },
        },
        update: {
            responseOptionId: responseOption.id,
        },
        create: {
            patientId,
            questionId,
            responseOptionId: responseOption.id,
        },
    });
}
