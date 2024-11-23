import { LinksFunction } from '@remix-run/node';

/**
 * Generates an array of link objects for Material-UI (MUI) styling dependencies.
 *
 * These links include preconnections and a stylesheet for Google Fonts.
 *
 * @type {LinksFunction}
 * @returns {Array<{ rel: string, href: string, crossOrigin?: string }>} An array of link objects for use in HTML headers.
 */
export const getMuiLinks: LinksFunction = () => [
    // Google Fonts for MUI
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
];
