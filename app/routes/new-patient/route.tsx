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
} from '@mui/material';
import { Form } from '@remix-run/react';
import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import StyledCard from '~/components/StyledCard';
import AppAppBar from '~/components/AppAppBar';
import { createPatient } from './queries';
import { requireAuthCookie } from '~/auth/auth';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const userId = await requireAuthCookie(request);

    const firstName = String(formData.get('firstName') ?? '');
    const lastName = String(formData.get('lastName') ?? '');
    const gender = String(formData.get('gender') ?? '');

    await createPatient(firstName, lastName, gender, userId);

    return redirect('/home');
}

export default function NewPatientForm() {
    // const actionResult = useActionData<typeof action>();

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
                                gap: 2,
                            }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="firstName">
                                    First Name
                                </FormLabel>
                                <TextField
                                    // helperText={actionResult?.errors?.firstName}
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={
                                    //     actionResult?.errors?.email
                                    //         ? 'error'
                                    //         : 'primary'
                                    // }
                                    sx={{ ariaLabel: 'firstName' }}
                                    // aria-describedby={
                                    //     actionResult?.errors?.email
                                    //         ? 'email-error'
                                    //         : 'login-header'
                                    // }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="lastName">
                                    First Name
                                </FormLabel>
                                <TextField
                                    // helperText={actionResult?.errors?.email}
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    autoComplete="family-name"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    // color={
                                    //     actionResult?.errors?.email
                                    //         ? 'error'
                                    //         : 'primary'
                                    // }
                                    sx={{ ariaLabel: 'lastName' }}
                                    // aria-describedby={
                                    //     actionResult?.errors?.email
                                    //         ? 'email-error'
                                    //         : 'login-header'
                                    // }
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="gender">Gender</FormLabel>
                                <Select
                                    fullWidth
                                    id="gender"
                                    name="gender"
                                    variant="outlined"
                                    required
                                    sx={{ ariaLabel: 'gender' }}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Nonbinary'}>
                                        Nonbinary
                                    </MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" fullWidth variant="contained">
                                Sign in
                            </Button>
                        </Box>
                    </Form>
                </StyledCard>
            </Container>
        </>
    );
}
