import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const main = async () => {
    const yesNoTask = prisma.answerFormat.create({
        data: { name: 'yesNo' },
    });

    const confusionLevelTask = prisma.answerFormat.create({
        data: { name: 'confusionLevel' },
    });

    const acuteOrFluctuatingTask = prisma.questionCategory.create({
        data: { name: 'acuteOrFluctuating' },
    });

    const inattentionTask = prisma.questionCategory.create({
        data: { name: 'inattention' },
    });

    const disorganizedThinkingTask = prisma.questionCategory.create({
        data: { name: 'disorganizedThinking' },
    });

    const alteredConsciousnessTask = prisma.questionCategory.create({
        data: { name: 'alteredConsciousness' },
    });

    const otherCategoryTask = prisma.questionCategory.create({
        data: { name: 'Other' },
    });

    const [
        yesNo,
        confusionLevel,
        acuteOrFluctuating,
        inattention,
        disorganizedThinking,
        alteredConsciousness,
        otherCategory,
    ] = await Promise.all([
        yesNoTask,
        confusionLevelTask,
        acuteOrFluctuatingTask,
        inattentionTask,
        disorganizedThinkingTask,
        alteredConsciousnessTask,
        otherCategoryTask,
    ]);

    const responseOptionTask = prisma.responseOption.createMany({
        data: [
            {
                answerFormatId: yesNo.id,
                responsevalue: 'Yes',
            },
            {
                answerFormatId: yesNo.id,
                responsevalue: 'No',
            },
            {
                answerFormatId: confusionLevel.id,
                responsevalue: 'Alert',
            },
            {
                answerFormatId: confusionLevel.id,
                responsevalue: 'Vigilant',
            },
            {
                answerFormatId: confusionLevel.id,
                responsevalue: 'Lethargic',
            },
            {
                answerFormatId: confusionLevel.id,
                responsevalue: 'Stupor',
            },
        ],
    });

    const questionTask = prisma.question.createMany({
        data: [
            {
                title: 'Acute Onset',
                content:
                    'Is there evidence of an acute change in mental status from the patient’s baseline?',
                answerFormatId: yesNo.id,
                order: 0,
                categoryId: acuteOrFluctuating.id,
            },
            {
                title: 'Inattention',
                content:
                    'Did the patient have difficulty focusing attention, for example, being easily distractible, or having difficulty keeping track of what was being said?',
                answerFormatId: yesNo.id,
                order: 1,
                categoryId: inattention.id,
            },
            {
                title: 'Disorganized Thinking',
                content:
                    'Was the patient’s thinking disorganized or incoherent, such as rambling or irrelevant conversation, unclear or illogical flow of ideas, or unpredictable switching from subject to subject?',
                answerFormatId: yesNo.id,
                order: 2,
                categoryId: disorganizedThinking.id,
            },
            {
                title: 'Altered Level of Consciousness',
                content:
                    'Overall, how would you rate this patient’s level of consciousness?',
                answerFormatId: confusionLevel.id,
                order: 3,
                categoryId: alteredConsciousness.id,
            },
            {
                title: 'Disorientation',
                content:
                    'Was the patient disoriented at any time during the interview, such as thinking that he or she was somewhere other than the hospital, using the wrong bed, or misjudging the time of day?',
                answerFormatId: yesNo.id,
                order: 4,
                categoryId: otherCategory.id,
            },
            {
                title: 'Memory Impairment',
                content:
                    'Did the patient demonstrate any memory problems during the interview, such as inability to remember events in the hospital or difficulty remembering instructions?',
                answerFormatId: yesNo.id,
                order: 5,
                categoryId: otherCategory.id,
            },
            {
                title: 'Perceptual Disturbances',
                content:
                    'Did the patient have any evidence of perceptual disturbances, for example, hallucinations, illusions or misinterpretations (such as thinking something was moving when it was not)?',
                answerFormatId: yesNo.id,
                order: 6,
                categoryId: otherCategory.id,
            },
            {
                title: 'Psychomotor Agitation',
                content:
                    'At any time during the interview did the patient have an unusually increased level of motor activity such as restlessness, picking at bedclothes, tapping fingers or making frequent sudden changes of position?',
                answerFormatId: yesNo.id,
                order: 7,
                categoryId: otherCategory.id,
            },
            {
                title: 'Psychomotor Retardation',
                content:
                    'At any time during the interview did the patient have an unusually decreased level of motor activity such as sluggishness, staring into space, staying in one position for a long time or moving very slowly?',
                answerFormatId: yesNo.id,
                order: 8,
                categoryId: otherCategory.id,
            },
            {
                title: 'Altered sleep-wake cycle',
                content:
                    'Did the patient have evidence of disturbance of the sleep-wake cycle, such as excessive daytime sleepiness with insomnia at night?',
                answerFormatId: yesNo.id,
                order: 9,
                categoryId: otherCategory.id,
            },
        ],
    });

    const genderTask = prisma.gender.createMany({
        data: [
            { gender: 'Male' },
            { gender: 'Female' },
            { gender: 'Nonbinary' },
            { gender: 'Other' },
        ],
    });

    const riskTypeTask = prisma.riskType.createMany({
        data: [
            { name: 'positiveDiagnosis' },
            { name: 'atRisk' },
            { name: 'oneOrMoreRiskFactors' },
            { name: 'noRisk' },
            { name: 'unknown' },
        ],
    });

    await Promise.all([
        questionTask,
        genderTask,
        riskTypeTask,
        responseOptionTask,
    ]);
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
