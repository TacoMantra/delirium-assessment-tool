import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
    Tooltip,
} from 'recharts';
import { Typography } from '@mui/material';
import StyledCard from './StyledCard';

interface RadarChartCardProps<T> {
    data: T[];
    title: string;
    maxCount: number;
    colors: string[];
    axisDataKey: string; // e.g., 'riskType'
}

/**
 * RadarChartCard is a reusable component that displays a radar chart for a given dataset.
 * It dynamically generates radar chart lines for each field in the provided data (excluding
 * the axisDataKey and 'fullMark' fields). The chart scales based on the maxCount value
 * and the colors are applied in a cycle for each radar line.
 *
 * @template T - The type of the data to be passed to the chart. It should be an array of objects
 *                where each object represents a data point for the radar chart.
 *
 * @param {Object} props - The props for the RadarChartCard component.
 * @param {T[]} props.data - The dataset to be used for rendering the radar chart.
 *                            It should be an array of objects with numerical values for each key.
 * @param {string} props.title - The title to display for the chart.
 * @param {number} props.maxCount - The maximum value to scale the radar chart's radius axis.
 *                                    It determines the upper limit of the radar chart's axis.
 * @param {string[]} props.colors - The colors to be used for each radar chart line. These colors
 *                                  will be applied cyclically based on the number of fields in the data.
 * @param {string} props.axisDataKey - The key in the data used to label the `PolarAngleAxis`.
 *                                      Typically, this could be something like 'riskType' or 'ageGroup'.
 *
 * @returns {JSX.Element} The RadarChartCard component, which renders a radar chart using the given data.
 */
export default function RadarChartCard<T>({
    data,
    title,
    maxCount,
    colors,
    axisDataKey,
}: RadarChartCardProps<T>) {
    return (
        <StyledCard>
            <Typography variant="h6">{title}</Typography>
            <RadarChart width={450} height={300} outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey={axisDataKey} />
                <PolarRadiusAxis angle={30} domain={[0, maxCount + 5]} />
                {data[0] &&
                    Object.keys(data[0]).map((key, index) => {
                        if (key !== axisDataKey && key !== 'fullMark') {
                            return (
                                <Radar
                                    key={key}
                                    name={key}
                                    dataKey={key}
                                    stroke={colors[index % colors.length]}
                                    fill={colors[index % colors.length]}
                                    fillOpacity={0.4}
                                />
                            );
                        }
                        return null;
                    })}
                <Legend />
                <Tooltip />
            </RadarChart>
        </StyledCard>
    );
}
