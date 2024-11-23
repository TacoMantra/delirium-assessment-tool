import dayjs from 'dayjs';
import { prisma } from '~/db/prisma';

/**
 * Creates a new patient record in the database.
 *
 * This function uses Prisma to insert a new patient into the database, connecting the patient to
 * an existing user account and gender entry. It also converts the provided date of birth to a JavaScript `Date` object.
 *
 * @param {string} firstName - The first name of the patient.
 * @param {string} lastName - The last name of the patient.
 * @param {string} gender - The gender identifier to associate with the patient.
 * @param {string} userId - The ID of the user account to connect to the patient.
 * @param {string} dateOfBirth - The patient's date of birth in string format (e.g., YYYY-MM-DD).
 * @returns {Promise<Patient>} A promise that resolves to the created patient object.
 */
export default async function createPatient(
    firstName: string,
    lastName: string,
    gender: string,
    userId: string,
    dateOfBirth: string
) {
    const patient = await prisma.patient.create({
        data: {
            firstname: firstName,
            lastname: lastName,
            dateofbirth: dayjs(dateOfBirth).toDate(),
            gender: {
                connect: { gender: gender },
            },
            account: {
                connect: { id: userId },
            },
        },
    });

    return patient;
}
