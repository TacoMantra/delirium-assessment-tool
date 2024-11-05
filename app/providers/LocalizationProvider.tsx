import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';

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
