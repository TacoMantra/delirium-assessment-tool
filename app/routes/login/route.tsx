import {
    Button,
    Box,
    FormLabel,
    FormControl,
    TextField,
    Typography,
} from '@mui/material';
import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { redirectIfLoggedInLoader, setAuthOnResponse } from '~/auth/auth';
import { validate } from './validate';
import { login } from './queries';
import StyledCard from '~/components/styledCard';
import SignInContainer from '~/components/signInContainer';

export const loader = redirectIfLoggedInLoader;

export const meta = () => {
    return [{ title: 'Delirium Assessment Tool Login' }];
};

export async function action({ request }: DataFunctionArgs) {
    const formData = await request.formData();
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');

    const errors = validate(email, password);
    if (errors) {
        return json({ ok: false, errors }, 400);
    }

    const userId = await login(email, password);
    if (userId === false) {
        return json(
            { ok: false, errors: { password: 'Invalid credentials' } },
            400
        );
    }

    const response = redirect('/home');
    return setAuthOnResponse(response, userId);
}

export default function LogIn() {
    const actionResult = useActionData<typeof action>();

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <StyledCard variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                    }}
                >
                    Sign in
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
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
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
                            Sign in
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <span>
                                <Link to="/signup">
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ alignSelf: 'center' }}
                                    >
                                        Sign up
                                    </Typography>
                                </Link>
                            </span>
                        </Typography>
                    </Box>
                </Form>
            </StyledCard>
        </SignInContainer>
    );
}
