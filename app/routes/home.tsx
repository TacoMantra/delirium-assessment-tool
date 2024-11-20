import { Container, Stack, Typography } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import {
    Legend,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
} from 'recharts';
import AppAppBar from '~/components/AppAppBar';
import StyledCard from '~/components/StyledCard';
import getDailyResultsBySegment from '~/queries/getDailyResultsBySegment';
import RiskAssessmentType from '~/terms/riskAssessment';

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
    const results = await getDailyResultsBySegment();
    return results;
}

export default function Home() {
    const results = useLoaderData<typeof loader>();

    const maxCount = useMemo(
        () =>
            results.reduce((max, obj) => {
                const highestInObj = Math.max(
                    ...Object.values(obj).filter(
                        (value) => typeof value === 'number'
                    )
                );
                return Math.max(max, highestInObj);
            }, -Infinity),
        [results]
    );

    const genderData = useMemo(
        () =>
            results.reduce((acc: Array<IGenderChartData>, curr) => {
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

                riskTypeData.fullMark = Math.max(
                    riskTypeData.fullMark,
                    count ?? 0
                );

                return acc;
            }, []),
        [results]
    );

    const ageGroupData = useMemo(
        () =>
            results.reduce((acc: Array<IAgeGroupChartData>, curr) => {
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

                riskTypeData.fullMark = Math.max(
                    riskTypeData.fullMark,
                    count ?? 0
                );

                return acc;
            }, []),
        [results]
    );

    return (
        <>
            <AppAppBar isAuthed={true} />
            <Container maxWidth="lg">
                <Stack direction={'row'} spacing={2}>
                    <StyledCard>
                        <Typography variant={'h6'} component={'h2'}>
                            Results by Gender
                        </Typography>
                        <RadarChart
                            width={450}
                            height={300}
                            outerRadius="80%"
                            data={genderData}
                        >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="riskType" />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, maxCount + 5]}
                            />
                            <Radar
                                name="Male"
                                dataKey="male"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.4}
                            />
                            <Radar
                                name="Female"
                                dataKey="female"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.4}
                            />
                            <Radar
                                name="Nonbinary"
                                dataKey="nonBinary"
                                stroke="#add8e6 "
                                fill="#add8e6 "
                                fillOpacity={0.4}
                            />
                            <Legend />
                        </RadarChart>
                    </StyledCard>

                    <StyledCard>
                        <Typography variant={'h6'} component={'h2'}>
                            Results by Age Group
                        </Typography>
                        <RadarChart
                            width={450}
                            height={300}
                            outerRadius="80%"
                            data={ageGroupData}
                        >
                            <PolarGrid />
                            <PolarAngleAxis dataKey="riskType" />
                            <PolarRadiusAxis
                                angle={30}
                                domain={[0, maxCount + 5]}
                            />
                            <Radar
                                name="0-17"
                                dataKey="0-17"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.4}
                            />
                            <Radar
                                name="18-30"
                                dataKey="18-30"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.4}
                            />
                            <Radar
                                name="31-40"
                                dataKey="31-40"
                                stroke="#FF928B "
                                fill="#FF928B "
                                fillOpacity={0.4}
                            />
                            <Radar
                                name="41-50"
                                dataKey="41-50"
                                stroke="#305252"
                                fill="#305252"
                                fillOpacity={0.4}
                            />
                            <Radar
                                name="51-60"
                                dataKey="51-60"
                                stroke="#2E5EAA"
                                fill="#2E5EAA"
                                fillOpacity={0.4}
                            />
                            <Radar
                                name="61+"
                                dataKey="61+"
                                stroke="#EC0B43"
                                fill="#EC0B43"
                                fillOpacity={0.4}
                            />
                            <Legend />
                        </RadarChart>
                    </StyledCard>
                </Stack>
            </Container>
        </>
    );
}
