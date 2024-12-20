import { prisma } from '~/db/prisma';
import RiskAssessmentType from '~/terms/riskAssessment';
import dayjs from 'dayjs';

/**
 * Creates a new risk assessment for a patient and updates daily results statistics.
 *
 * This function:
 * - Verifies the existence of a `RiskType` based on the provided name.
 * - Fetches the patient's gender and date of birth.
 * - Determines the appropriate age group based on the patient's age.
 * - Creates a new `RiskAssessment` entry.
 * - Updates or creates the `DailyResults` record for tracking risk assessments by type, age group, and gender.
 *
 * @param {string} patientId - The ID of the patient for whom the risk assessment is created.
 * @param {keyof typeof RiskAssessmentType} riskAssessmentType - The name of the risk type to assess.
 * @returns {Promise<Object>} A promise that resolves to the created `RiskAssessment` object.
 * @throws {Error} Throws an error if:
 *   - The specified `RiskType` is not found.
 *   - The patient data (gender or date of birth) is incomplete or missing.
 *   - No `AgeGroup` matches the patient's age.
 *   - A database operation fails.
 */
export default async function createRiskAssessment(
    patientId: string,
    riskAssessmentType: keyof typeof RiskAssessmentType
) {
    try {
        // Find the RiskType
        const riskType = await prisma.riskType.findUnique({
            where: { name: riskAssessmentType },
            select: { id: true },
        });

        if (!riskType) {
            throw new Error(
                `RiskType with name "${riskAssessmentType}" not found.`
            );
        }

        // Fetch Patient's Gender and DOB
        const patient = await prisma.patient.findUnique({
            where: { id: patientId },
            select: {
                genderId: true,
                dateofbirth: true,
            },
        });

        if (!patient || !patient.genderId || !patient.dateofbirth) {
            throw new Error(`Patient data is incomplete or not found.`);
        }

        // Determine AgeGroup
        const patientAge = dayjs().diff(dayjs(patient.dateofbirth), 'year');
        const ageGroup = await prisma.ageGroup.findFirst({
            where: {
                minAge: { lte: patientAge },
                OR: [
                    { maxAge: { gte: patientAge } }, // Within a bounded range
                    { maxAge: null }, // Catch-all for no upper limit
                ],
            },
            select: { id: true },
        });

        if (!ageGroup) {
            throw new Error(`No AgeGroup found for age ${patientAge}`);
        }

        // Create RiskAssessment
        const riskAssessment = await prisma.riskAssessment.create({
            data: {
                patientId,
                riskTypeId: riskType.id,
            },
        });

        console.log('RiskAssessment created:', riskAssessment);

        // Increment or create DailyResults
        const today = dayjs().startOf('day').toDate();

        await prisma.dailyResults.upsert({
            where: {
                riskTypeId_ageGroupId_genderId_createdAt: {
                    riskTypeId: riskType.id,
                    ageGroupId: ageGroup.id,
                    genderId: patient.genderId,
                    createdAt: today,
                },
            },
            create: {
                riskTypeId: riskType.id,
                ageGroupId: ageGroup.id,
                genderId: patient.genderId,
                createdAt: today,
                count: 1,
            },
            update: {
                count: { increment: 1 },
            },
        });

        console.log('DailyResults updated for today.');
        return riskAssessment;
    } catch (error) {
        console.error('Error creating RiskAssessment:', error);
        throw error;
    }
}
