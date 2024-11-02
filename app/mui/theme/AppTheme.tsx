import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { palette, typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
    children: React.ReactNode;
    themeComponents?: ThemeOptions['components'];
}

export default function AppTheme({ children, themeComponents }: AppThemeProps) {
    const theme = React.useMemo(() => {
        return createTheme({
            palette,
            typography,
            shadows,
            shape,
            components: {
                ...inputsCustomizations,
                ...dataDisplayCustomizations,
                ...feedbackCustomizations,
                ...navigationCustomizations,
                ...surfacesCustomizations,
                ...themeComponents,
            },
        });
    }, [themeComponents]);
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
