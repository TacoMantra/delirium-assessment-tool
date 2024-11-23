import { Container, Stack } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import AppAppBar from '~/components/AppAppBar';
import getDailyResultsBySegment from '~/queries/getDailyResultsBySegment';
import RiskAssessmentType from '~/terms/riskAssessment';
import RadarChartCard from '~/components/RadarChartCard';
import getRiskTrendsForLastNDays from '~/queries/getRiskTrendsForLastNDays';
import { useEffect } from 'react';
import RiskTypeTrendsCard from '~/components/RiskTypeTrendsCard';

export const meta = () => {
    return [{ title: 'Home' }];
};

interface IGenderChartData {
    riskType: string;
    male: number;
    female: number;
    nonBinary: number;
    otherGender: number;
    fullMark: number;
}

interface IAgeGroupChartData {
    riskType: string;
    '0-17': number;
    '18-30': number;
    '31-40': number;
    '41-50': number;
    '51-60': number;
    '61+': number;
    fullMark: number;
}

export async function loader() {
    const resultsBySegment = await getDailyResultsBySegment();

    const dailyTrendResults = await getRiskTrendsForLastNDays();

    // The highest count of Last 30 days by segment, for rendering the correct chart scale
    const maxCount = resultsBySegment.reduce((max, obj) => {
        const highestInObj = Math.max(
            ...Object.values(obj).filter((value) => typeof value === 'number')
        );
        return Math.max(max, highestInObj);
    }, -Infinity);

    // The data for the Last 30 days by gender chart
    const genderData = resultsBySegment.reduce<IGenderChartData[]>(
        (acc, curr) => {
            const { riskType, gender, count } = curr;

            const mappedRiskType =
                RiskAssessmentType[
                    riskType as keyof typeof RiskAssessmentType
                ].replace('One or More Risk Factors', '1+ Factors') ??
                'Unknown';

            // Find existing riskTypeData or create a new one
            let riskTypeData = acc?.find(
                (item) => item.riskType === mappedRiskType
            );
            if (!riskTypeData) {
                riskTypeData = {
                    riskType: mappedRiskType,
                    male: 0,
                    female: 0,
                    nonBinary: 0,
                    otherGender: 0,
                    fullMark: 0,
                };
                acc.push(riskTypeData); // Add to accumulator if new
            }

            // Update gender-specific count
            switch (gender) {
                case 'Male':
                    riskTypeData.male += count ?? 0;
                    break;
                case 'Female':
                    riskTypeData.female += count ?? 0;
                    break;
                case 'Nonbinary':
                    riskTypeData.nonBinary += count ?? 0;
                    break;
                case 'Other':
                    riskTypeData.otherGender += count ?? 0;
                    break;
            }

            riskTypeData.fullMark = Math.max(riskTypeData.fullMark, count ?? 0);

            return acc;
        },
        []
    );

    // The data for the Last 30 days by agegroup chart
    const ageGroupData = resultsBySegment.reduce<IAgeGroupChartData[]>(
        (acc, curr) => {
            const { riskType, ageGroup, count } = curr;

            const mappedRiskType =
                RiskAssessmentType[
                    riskType as keyof typeof RiskAssessmentType
                ].replace('One or More Risk Factors', '1+ Factors') ??
                'Unknown';

            // Find existing riskTypeData or create a new one
            let riskTypeData = acc?.find(
                (item) => item.riskType === mappedRiskType
            );
            if (!riskTypeData) {
                riskTypeData = {
                    riskType: mappedRiskType,
                    '0-17': 0,
                    '18-30': 0,
                    '31-40': 0,
                    '41-50': 0,
                    '51-60': 0,
                    '61+': 0,
                    fullMark: 0,
                };
                acc.push(riskTypeData); // Add to accumulator if new
            }

            // Update gender-specific count
            switch (ageGroup) {
                case '0-17':
                    riskTypeData['0-17'] += count ?? 0;
                    break;
                case '18-30':
                    riskTypeData['18-30'] += count ?? 0;
                    break;
                case '31-40':
                    riskTypeData['31-40'] += count ?? 0;
                    break;
                case '41-50':
                    riskTypeData['41-50'] += count ?? 0;
                    break;
                case '51-60':
                    riskTypeData['51-60'] += count ?? 0;
                    break;
                case '61+':
                    riskTypeData['61+'] += count ?? 0;
                    break;
            }

            riskTypeData.fullMark = Math.max(riskTypeData.fullMark, count ?? 0);

            return acc;
        },
        []
    );

    return { maxCount, genderData, ageGroupData, dailyTrendResults };
}

export default function Home() {
    const { maxCount, genderData, ageGroupData, dailyTrendResults } =
        useLoaderData<typeof loader>();

    useEffect(() => console.log(dailyTrendResults), [dailyTrendResults]);

    return (
        <>
            <AppAppBar isAuthed={true} />
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Stack direction={'row'} spacing={2}>
                        <RadarChartCard
                            title="Risk Type by Gender - Last 30 Days"
                            data={genderData}
                            maxCount={maxCount}
                            colors={['#8884d8', '#82ca9d', '#add8e6']}
                            axisDataKey="riskType"
                        />

                        <RadarChartCard
                            title="Risk Type by Age Group - Last 30 Days"
                            data={ageGroupData}
                            maxCount={maxCount}
                            colors={[
                                '#8884d8',
                                '#82ca9d',
                                '#FF928B',
                                '#305252',
                                '#2E5EAA',
                                '#EC0B43',
                            ]}
                            axisDataKey="riskType"
                        />
                    </Stack>
                    <RiskTypeTrendsCard
                        data={dailyTrendResults}
                        title="Risk Type Trends - Last 30 Days"
                    />
                </Stack>
            </Container>
        </>
    );
}
