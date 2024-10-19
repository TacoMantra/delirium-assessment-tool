import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    type ShouldRevalidateFunctionArgs,
    Link,
} from '@remix-run/react';
import { redirect, type DataFunctionArgs } from '@remix-run/node';

import { LoginIcon, LogoutIcon } from './icons/icons';
import { getAuthFromRequest } from './auth/auth';

import './styles.css';

export async function loader({ request }: DataFunctionArgs) {
    const auth = await getAuthFromRequest(request);
    if (auth && new URL(request.url).pathname === '/') {
        throw redirect('/home');
    }
    return auth;
}

export function shouldRevalidate({ formAction }: ShouldRevalidateFunctionArgs) {
    return formAction && ['/login', '/signup', 'logout'].includes(formAction);
}

export default function App() {
    const userId = useLoaderData<typeof loader>();

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
            <body className="h-screen bg-slate-100 text-slate-900">
                <div className="h-full flex flex-col min-h-0">
                    <div className="bg-slate-900 border-b border-slate-800 flex items-center justify-between py-4 px-8 box-border">
                        <div className="w-1/3 flex justify-end">
                            {userId ? (
                                <form method="post" action="/logout">
                                    <button className="block text-center">
                                        <LogoutIcon />
                                        <br />
                                        <span className="text-slate-500 text-xs uppercase font-bold">
                                            Log out
                                        </span>
                                    </button>
                                </form>
                            ) : (
                                <Link to="/login" className="block text-center">
                                    <LoginIcon />
                                    <br />
                                    <span className="text-slate-500 text-xs uppercase font-bold">
                                        Log in
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex-grow min-h-0 h-full">
                        <Outlet />
                    </div>
                </div>

                <ScrollRestoration />
                <LiveReload />
                <Scripts />
            </body>
        </html>
    );
}
