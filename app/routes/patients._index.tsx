import React, { useState, useEffect, useCallback } from 'react';
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
import { Link, useLoaderData } from '@remix-run/react';
import { useAuth } from '~/providers/AuthProvider';
import dayjs from 'dayjs';
import StyledCard from '~/components/StyledCard';
import AppAppBar from '~/components/AppAppBar';
import RiskAssessmentType from '~/terms/riskAssessment';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuthCookie(request);
    const initialPatients = await getPatientsByAccountId(userId, 0, 100);

    return initialPatients;
}

export default function Patients() {
    const initialPatients = useLoaderData<typeof loader>();
    const userId = String(useAuth());
    const theme = useTheme();

    const [data, setData] = useState(initialPatients);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPatientsByAccountId(
                userId,
                page * rowsPerPage,
                rowsPerPage
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setData(response as unknown as any);
            setTotalCount((response as Array<unknown>).length);
        };

        fetchData();
    }, [page, rowsPerPage, userId]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Risk Level</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => {
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
                                                    {dayjs(row.dateofbirth)
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
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </Stack>
        </Container>
    );
}
