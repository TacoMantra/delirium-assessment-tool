import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from '@remix-run/react';
import { getMuiLinks } from './mui/getMuiLinks';
import { LinksFunction } from '@remix-run/node';
import { MuiDocument } from './mui/MuiDocument';
import AppContainer from './components/AppContainer';
import StyledCard from './components/StyledCard';
import { Typography } from '@mui/material';

export const links: LinksFunction = () => [...getMuiLinks()];

export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
        <html lang="en">
            <head>
                <title>Oh no!</title>
                <Meta />
                <Links />
            </head>
            <body>
                <AppContainer direction="column" justifyContent="space-between">
                    <StyledCard>
                        <Typography variant="h1">Oh no!</Typography>
                        <Typography>
                            Looks like we encountered a problem. Please refresh
                            and try again.
                        </Typography>
                    </StyledCard>
                </AppContainer>
                <Scripts />
            </body>
        </html>
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
    return (
        <>
            <MuiDocument>
                <Outlet />
            </MuiDocument>
        </>
    );
}
