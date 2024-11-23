import { redirect } from '@remix-run/node';
import { prisma } from '~/db/prisma';

/**
 * Retrieves a patient by ID and ensures that the requesting user has permission to view the patient.
 *
 * This function fetches a patient’s details by their ID, along with related data such as gender,
 * responses to questions, and risk assessment. It checks whether the patient belongs to the provided user ID.
 * If the user does not have permission, the user is redirected to the home page.
 *
 * @param {string} id - The ID of the patient to retrieve.
 * @param {string} userId - The ID of the user requesting the patient data.
 * @returns {Promise<Object>} A promise that resolves to a patient object, including:
 * - `gender` (string): The gender of the patient.
 * - `patientResponse` (Array<Object>): A list of responses to questions, each containing:
 *     - `responseOption` (Object): The response value for the answer.
 *     - `question` (Object): The title of the question.
 * - `riskAssessment` (Array<Object>): A list of risk assessments, each containing:
 *     - `risktype` (Object): The type of risk.
 * @throws {Error} Throws an error if the patient is not found or the user does not have permission to view the patient.
 * @returns {Redirect} Redirects to the home page if an error occurs or the user is not permitted to view the patient.
 */
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
