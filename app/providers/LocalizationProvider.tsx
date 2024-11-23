import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/node/AdapterDayjs';
import React from 'react';

/**
 * Provides localization support for Material-UI components.
 *
 * This component wraps its children with Material-UI's `LocalizationProvider`,
 * which is configured to use the Day.js adapter for date handling.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that require access to the localization context.
 * @returns {JSX.Element} A provider component wrapping the children with localization context.
 */
export default function LocalizationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <MuiLocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </MuiLocalizationProvider>
    );
}
