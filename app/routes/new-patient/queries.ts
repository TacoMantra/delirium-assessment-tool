import dayjs from 'dayjs';
import { prisma } from '~/db/prisma';

export async function createPatient(
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
