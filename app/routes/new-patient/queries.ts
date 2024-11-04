import { prisma } from '~/db/prisma';

export async function createPatient(
    firstName: string,
    lastName: string,
    // dateOfBirth: Date,
    gender: string,
    userId: string
) {
    await prisma.patient.create({
        data: {
            firstname: firstName,
            lastname: lastName,
            dateofbirth: new Date(),
            gender: {
                connect: { gender: gender },
            },
            account: {
                connect: { id: userId },
            },
        },
    });
}
