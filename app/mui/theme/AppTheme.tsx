import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
    children: React.ReactNode;
    themeComponents?: ThemeOptions['components'];
}

export default function AppTheme({ children, themeComponents }: AppThemeProps) {
    const theme = React.useMemo(() => {
        return createTheme({
            colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
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
