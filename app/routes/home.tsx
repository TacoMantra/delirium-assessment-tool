import { Container, Typography } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
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

interface IRadarChartData {
    riskType: string;
    male: number;
    female: number;
    nonBinary: number;
    otherGender: number;
    fullMark: number;
}

export async function loader() {
    const results = await getDailyResultsBySegment();
    return results;
}

export default function Home() {
    const results = useLoaderData<typeof loader>();

    const genderData = results.reduce((acc: Array<IRadarChartData>, curr) => {
        const { riskType, gender, count } = curr;

        const mappedRiskType =
            RiskAssessmentType[riskType as keyof typeof RiskAssessmentType] ??
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
            (count ?? 0) + 5
        );

        return acc;
    }, []);

    useEffect(() => {
        console.log(genderData);
    }, [genderData]);

    return (
        <>
            <AppAppBar isAuthed={true} />
            <Container maxWidth="md">
                <StyledCard>
                    <Typography variant={'h2'} component={'h3'}>
                        Results by Gender
                    </Typography>
                    <RadarChart
                        width={800}
                        height={300}
                        outerRadius="80%"
                        data={genderData}
                    >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="riskType" />
                        <PolarRadiusAxis angle={30} domain={[0, 8]} />
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
            </Container>
        </>
    );
}
