import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { AreaChartItem } from '~/queries/getRiskTrendsForLastNDays';
import RiskAssessmentType from '~/terms/riskAssessment';
import StyledCard from './StyledCard';
import { Typography } from '@mui/material';

/**
 * Stacked Area Chart component to visualize different risk categories over time.
 *
 * @param {Array<{ name: string, [key: string]: number }>} data - The formatted data for the chart.
 * @returns {JSX.Element} The rendered Stacked Area Chart.
 */
interface IAreaChartCardProps {
    data: Array<AreaChartItem>;
    title: string;
}

const RiskTypeTrendsCard: React.FC<IAreaChartCardProps> = ({ data, title }) => {
    // Ensure that all risk types are included and missing ones are initialized as 0
    const riskTypes = Object.keys(RiskAssessmentType).filter(
        (riskType) => riskType !== 'unknown'
    ) as (keyof typeof RiskAssessmentType)[];

    // Ensure that all days have the full set of risk types
    const completeData = data.map((entry) => {
        const fullEntry = { ...entry }; // Copy the entry
        riskTypes.forEach((riskType) => {
            // If the risk type is missing for the day, set it to 0
            if (!(riskType in fullEntry)) {
                fullEntry[riskType] = 0;
            }
        });
        return fullEntry;
    });

    return (
        <StyledCard>
            <Typography variant="h6">{title}</Typography>
            <AreaChart
                data={completeData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                width={1080}
                height={400}
            >
                {/* Gradient Definitions */}
                <defs>
                    {riskTypes.map((riskType) => (
                        <linearGradient
                            id={`color${riskType}`}
                            key={riskType}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={getGradientColor(riskType)}
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor={getGradientColor(riskType)}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    ))}
                </defs>

                {/* Axis, Grid, and Tooltip */}
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />

                {/* Render Areas for Each Risk Type */}
                {riskTypes.map((riskType) => (
                    <Area
                        key={riskType}
                        type="monotone"
                        dataKey={riskType}
                        name={RiskAssessmentType[riskType]}
                        stroke={getGradientColor(riskType)}
                        fillOpacity={1}
                        fill={`url(#color${riskType})`}
                    />
                ))}
            </AreaChart>
        </StyledCard>
    );
};

/**
 * Returns a color based on the risk type.
 *
 * @param {keyof typeof RiskAssessmentType} riskType - The type of the risk assessment.
 * @returns {string} The color associated with the risk type.
 */
const getGradientColor = (riskType: string): string => {
    switch (riskType) {
        case 'positiveDiagnosis':
            return '#8884d8'; // Blue
        case 'atRisk':
            return '#82ca9d'; // Green
        case 'oneOrMoreRiskFactors':
            return '#ffc658'; // Yellow
        case 'noRisk':
            return '#d2d2d2'; // Gray
        default:
            return '#8884d8'; // Default color
    }
};

export default RiskTypeTrendsCard;
