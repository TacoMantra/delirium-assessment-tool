import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';

import { getMuiLinks } from './mui/getMuiLinks';
import { LinksFunction } from '@remix-run/node';
import { MuiDocument } from './mui/MuiDocument';
import AppContainer from './components/AppContainer';

export const links: LinksFunction = () => [...getMuiLinks()];

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
