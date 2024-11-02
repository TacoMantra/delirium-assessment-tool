import { Box, Stack, Typography } from '@mui/material';
import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { redirectIfLoggedInLoader } from '~/auth/auth';
import StyledCard from '~/components/StyledCard';
import logo from '../assets/logo.png';

export const meta: MetaFunction = () => {
    return [{ title: 'Delirium Assessment Tool' }];
};

export const loader = redirectIfLoggedInLoader;

export default function Index() {
    return (
        <StyledCard variant="outlined">
            <Stack>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                        src={logo}
                        width="120"
                        height="120"
                        alt="Delirium Assessment Tool Logo"
                    />
                </Box>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ textAlign: 'center' }}
                >
                    Delirium Assessment Tool
                </Typography>
            </Stack>
            <p>
                If you are a new user, please <Link to="/signup">sign up</Link>.
            </p>
            <p>
                Returning users, please <Link to="login">sign in</Link>.
            </p>
        </StyledCard>
    );
}
