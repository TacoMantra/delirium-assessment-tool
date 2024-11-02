import { json, type ActionFunctionArgs, redirect } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { redirectIfLoggedInLoader, setAuthOnResponse } from '~/auth/auth';
import { validate } from './validate';
import { createAccount } from './queries';
import StyledCard from '~/components/StyledCard';
import {
    Button,
    Box,
    FormLabel,
    FormControl,
    TextField,
    Typography,
} from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export const loader = redirectIfLoggedInLoader;

export const meta = () => {
    return [{ title: 'Signup' }];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    const errors = await validate(email, password);
    if (errors) {
        return json({ ok: false, errors }, 400);
    }

    const user = await createAccount(email, password);
    return setAuthOnResponse(redirect('/home'), user.id);
}

export default function Signup() {
    const actionResult = useActionData<typeof action>();

    return (
        <StyledCard variant="outlined">
            <ChevronLeftRoundedIcon />
            <Typography
                component="h1"
                variant="h4"
                sx={{
                    width: '100%',
                    fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                }}
            >
                Sign Up
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
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            helperText={actionResult?.errors?.email}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            required
                            fullWidth
                            variant="outlined"
                            color={
                                actionResult?.errors?.email
                                    ? 'error'
                                    : 'primary'
                            }
                            sx={{ ariaLabel: 'email' }}
                            aria-describedby={
                                actionResult?.errors?.email
                                    ? 'email-error'
                                    : 'login-header'
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormLabel htmlFor="password">Password</FormLabel>
                        </Box>
                        <TextField
                            error={actionResult?.errors?.password}
                            helperText={actionResult?.errors?.password}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            color={
                                actionResult?.errors?.password
                                    ? 'error'
                                    : 'primary'
                            }
                            aria-describedby="password-error"
                        />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained">
                        Sign up
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account?{' '}
                        <span>
                            <Link to="/login">
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Sign in
                                </Typography>
                            </Link>
                        </span>
                    </Typography>
                </Box>
            </Form>
        </StyledCard>
    );
}
