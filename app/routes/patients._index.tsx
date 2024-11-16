import React, { useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Container,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { LoaderFunctionArgs } from '@remix-run/node';
import { requireAuthCookie } from '~/auth/auth';
import getPatientsByAccountId from '~/queries/getPatientsByAccountId';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import dayjs from 'dayjs';
import StyledCard from '~/components/StyledCard';
import AppAppBar from '~/components/AppAppBar';
import RiskAssessmentType from '~/terms/riskAssessment';
import utc from 'dayjs/plugin/utc';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;
    const userId = await requireAuthCookie(request);

    const [patients, totalCount] = await getPatientsByAccountId(
        userId,
        offset,
        limit
    );

    return { patients, totalCount, page, limit };
}

export default function Patients() {
    const { patients, totalCount, page, limit } =
        useLoaderData<typeof loader>();
    const theme = useTheme();
    const navigate = useNavigate();

    dayjs.extend(utc);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        navigate(`/patients?page=${newPage + 1}&limit=${limit}`);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newLimit = parseInt(event.target.value, 10);
        navigate(`/patients?page=${1}&limit=${newLimit}`);
    };

    const getCriticalityColor = useCallback(
        (text: string) => {
            const palette = theme.palette;

            if (text === RiskAssessmentType.positiveDiagnosis) {
                return palette.error.main;
            }
            if (text === RiskAssessmentType.atRisk) {
                return palette.warning.main;
            }
            if (text === RiskAssessmentType.oneOrMoreRiskFactors) {
                return palette.warning.light;
            }
            if (text === RiskAssessmentType.noRisk) {
                return palette.success.main;
            }

            return palette.text.primary;
        },
        [theme.palette]
    );

    return (
        <Container maxWidth="lg">
            <AppAppBar isAuthed={true} />
            <Stack spacing={3}>
                <Typography variant="h3" component={'h1'}>
                    Patients
                </Typography>
                <div>
                    <TableContainer component={StyledCard}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Assessment Date</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Risk Level</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients.map((row) => {
                                    const riskTypeFriendlyName =
                                        RiskAssessmentType[
                                            row.riskAssessment?.[0]?.risktype
                                                ?.name as keyof typeof RiskAssessmentType
                                        ] ?? 'Unknown Risk';

                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <Link to={`${row.id}`}>
                                                    {row.firstname}{' '}
                                                    {row.lastname}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(row.createdAt)
                                                    .format('MM/DD/YYYY')
                                                    .toString()}
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    color={getCriticalityColor(
                                                        riskTypeFriendlyName
                                                    )}
                                                >
                                                    {row.gender?.gender}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    color={getCriticalityColor(
                                                        riskTypeFriendlyName
                                                    )}
                                                >
                                                    {dayjs
                                                        .utc(row.dateofbirth)
                                                        .format('MM/DD/YYYY')
                                                        .toString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    color={getCriticalityColor(
                                                        riskTypeFriendlyName
                                                    )}
                                                >
                                                    {riskTypeFriendlyName}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={limit}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </Stack>
        </Container>
    );
}
