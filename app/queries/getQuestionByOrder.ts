import { redirect } from '@remix-run/node';
import { prisma } from '~/db/prisma';

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
        return redirect(`/patients/${patientId}`);
    }
}
