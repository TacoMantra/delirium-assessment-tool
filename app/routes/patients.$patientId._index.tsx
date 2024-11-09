import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Container,
    Typography,
    Stack,
    useTheme,
    TableHead,
} from '@mui/material';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { requireAuthCookie } from '~/auth/auth';
import AppAppBar from '~/components/AppAppBar';
import StyledCard from '~/components/StyledCard';
import getPatientById from '~/queries/getPatientById';
import RiskAssessmentType from '~/terms/riskAssessment';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const patientId = String(params.patientId);
    const userId = await requireAuthCookie(request);
    const patient = await getPatientById(patientId, userId);

    return patient;
}

export default function Patient() {
    const patient = useLoaderData<typeof loader>();
    const theme = useTheme();

    const getCriticalityColor = useCallback(
        (text: string) => {
            const palette = theme.palette;

            if (
                text === 'Yes' ||
                text === 'Stupor' ||
                text === RiskAssessmentType.positiveDiagnosis
            ) {
                return palette.error.main;
            }
            if (text === 'Lethargic' || text === RiskAssessmentType.atRisk) {
                return palette.warning.main;
            }
            if (text === 'One') {
                return palette.warning.light;
            }
            return palette.text.primary;
        },
        [theme.palette]
    );

    const riskTypeFriendlyName = useMemo(
        () =>
            RiskAssessmentType[
                patient.riskAssessment?.[0]?.risktype
                    ?.name as keyof typeof RiskAssessmentType
            ] ?? 'Unknown Risk',
        [patient.riskAssessment]
    );

    const demographicRows = useMemo(
        () => [
            {
                key: 'Assessed',
                value: dayjs(patient.createdAt).format('MM/DD/YYYY').toString(),
                id: 'Assessed',
            },
            {
                key: 'Date of Birth',
                value: dayjs(patient?.dateofbirth)
                    .format('MM/DD/YYYY')
                    .toString(),
                id: 'dob',
            },
            { key: 'Gender', value: patient.gender?.gender },
            {
                key: <strong>Risk Level</strong>,
                value: <strong>{riskTypeFriendlyName}</strong>,
                id: 'riskLevel',
            },
        ],
        [
            patient.createdAt,
            patient?.dateofbirth,
            patient.gender?.gender,
            riskTypeFriendlyName,
        ]
    );

    const responseRows = useMemo(
        () =>
            patient.patientResponse.map((response) => ({
                key: (
                    <Typography
                        color={getCriticalityColor(
                            response?.responseOption?.responsevalue
                        )}
                    >
                        {response?.question?.title}
                    </Typography>
                ),
                value: (
                    <Typography
                        color={getCriticalityColor(
                            response?.responseOption?.responsevalue
                        )}
                    >
                        {response?.responseOption?.responsevalue}
                    </Typography>
                ),
                id: response?.question?.title,
            })),
        [getCriticalityColor, patient.patientResponse]
    );

    return (
        <>
            <AppAppBar isAuthed={true} />
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Typography variant="h3" component={'h1'}>
                            {patient.firstname} {patient.lastname}
                        </Typography>
                        <Typography
                            variant="h5"
                            component={'h2'}
                            color={getCriticalityColor(riskTypeFriendlyName)}
                        >
                            {riskTypeFriendlyName}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ alignItems: 'flex-start' }}
                    >
                        <TableContainer component={StyledCard}>
                            <Table aria-label="patient table">
                                <TableBody>
                                    {demographicRows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.key}
                                            </TableCell>
                                            <TableCell>{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer component={StyledCard}>
                            <Table aria-label="patient resposne table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Question</TableCell>
                                        <TableCell>Response</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {responseRows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.key}
                                            </TableCell>
                                            <TableCell>{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
