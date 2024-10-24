import {
    Button,
    Box,
    FormLabel,
    FormControl,
    TextField,
    Typography,
    Stack,
    Card,
    styled,
} from '@mui/material';
import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { redirectIfLoggedInLoader, setAuthOnResponse } from '~/auth/auth';
import { validate } from './validate';
import { login } from './queries';

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

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn() {
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
