import { PrismaClient } from '@prisma/client';

/**
 * ##  prisma
 *
 * Returns a new Type-safe database client object
 * @example
 * ```
 * import { prisma } from '~/db/prisma';
 * // Fetch zero or more Questions
 * const question = await prisma.question.findMany()
 * ```
 *
 *
 * Read more at [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
const prisma = new PrismaClient();

process.on('beforeExit', () => {
    prisma.$disconnect();
});

export { prisma };
