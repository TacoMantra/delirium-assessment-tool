import { useState } from 'react';
import {
    Container,
    FormLabel,
    Typography,
    Box,
    FormControl,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';
import { Form, useActionData } from '@remix-run/react';
import { json, redirect, type ActionFunctionArgs } from '@remix-run/node';
import StyledCard from '~/components/StyledCard';
import AppAppBar from '~/components/AppAppBar';
import createPatient from '~/queries/createPatient';
import { requireAuthCookie } from '~/auth/auth';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import validateNewPatient from '~/validators/newPatient';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const userId = await requireAuthCookie(request);

    const firstName = String(formData.get('firstName') ?? '');
    const lastName = String(formData.get('lastName') ?? '');
    const gender = String(formData.get('gender') ?? '');
    const dateOfBirth = String(formData.get('dateOfBirth'));

    const errors = validateNewPatient(firstName, lastName, dateOfBirth);

    if (errors) {
        return json({ ok: false, errors }, 400);
    }

    const patient = await createPatient(
        firstName,
        lastName,
        gender,
        userId,
        dateOfBirth
    );

    return redirect(`/patients/${patient.id}/questions/0`);
}

export default function NewPatientForm() {
    const actionResult = useActionData<typeof action>();

    const [gender, setGender] = useState('Other');
    const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    return (
        <>
            <AppAppBar isAuthed={true} />
            <Container maxWidth={'md'}>
                <StyledCard variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        New Patient
                    </Typography>
                    <Form method="post">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: 3,
                            }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="firstName">
                                    First Name
                                </FormLabel>
                                <TextField
                                    helperText={actionResult?.errors?.firstName}
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={
                                        actionResult?.errors?.firstName
                                            ? 'error'
                                            : 'primary'
                                    }
                                    sx={{ ariaLabel: 'firstName' }}
                                    aria-describedby={
                                        actionResult?.errors?.firstName
                                            ? 'email-error'
                                            : 'login-header'
                                    }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="lastName">
                                    First Name
                                </FormLabel>
                                <TextField
                                    helperText={actionResult?.errors?.lastName}
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    autoComplete="family-name"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={
                                        actionResult?.errors?.lastName
                                            ? 'error'
                                            : 'primary'
                                    }
                                    sx={{ ariaLabel: 'lastName' }}
                                    aria-describedby={
                                        actionResult?.errors?.lastName
                                            ? 'email-error'
                                            : 'login-header'
                                    }
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="gender-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender"
                                    value={gender}
                                    label="Gender"
                                    onChange={handleGenderChange}
                                    required
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Nonbinary'}>
                                        Nonbinary
                                    </MenuItem>
                                    <MenuItem value={'Other'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date Of Birth</FormLabel>
                                <DatePicker
                                    value={dateOfBirth}
                                    onChange={(value) => setDateOfBirth(value)}
                                    slotProps={{
                                        textField: {
                                            helperText:
                                                actionResult?.errors
                                                    ?.dateOfBirth,
                                        },
                                    }}
                                />
                            </FormControl>
                            <Button type="submit" fullWidth variant="contained">
                                Begin Assessment
                            </Button>
                        </Box>
                        <input type="hidden" name={'gender'} value={gender} />
                        <input
                            type="hidden"
                            name={'dateOfBirth'}
                            value={
                                dateOfBirth?.isValid()
                                    ? dateOfBirth.toISOString()
                                    : ''
                            }
                        />
                    </Form>
                </StyledCard>
            </Container>
        </>
    );
}
