import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useRouteError,
} from '@remix-run/react';
import { getMuiLinks } from './mui/getMuiLinks';
import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { MuiDocument } from './mui/MuiDocument';
import AppContainer from './components/AppContainer';
import StyledCard from './components/StyledCard';
import { Typography } from '@mui/material';
import { getAuthFromRequest } from './auth/auth';
import AuthProvider from './providers/AuthProvider';

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await getAuthFromRequest(request);
    return userId;
}

export const links: LinksFunction = () => [...getMuiLinks()];

export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
        <AppContainer direction="column" justifyContent="space-between">
            <StyledCard>
                <Typography variant="h1">Oh no!</Typography>
                <Typography>
                    Looks like we encountered a problem. Please refresh and try
                    again.
                </Typography>
            </StyledCard>
        </AppContainer>
    );
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <AppContainer direction="column" justifyContent="space-between">
                    {children}
                </AppContainer>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const userId = useLoaderData<typeof loader>();

    return (
        <>
            <MuiDocument>
                <AuthProvider userId={userId}>
                    <Outlet />
                </AuthProvider>
            </MuiDocument>
        </>
    );
}
