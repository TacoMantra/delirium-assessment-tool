import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import createCache from '@emotion/cache';
import theme from '../mui/theme/theme';

function createEmotionCache() {
    return createCache({ key: 'css' });
}

/**
 * Provides Material-UI theme and Emotion cache to its children.
 *
 * This component wraps its children with the `CacheProvider` to provide a custom Emotion cache,
 * and the `ThemeProvider` to apply a Material-UI theme.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that require access to the theme and Emotion cache.
 * @returns {JSX.Element} A provider component wrapping the children with theme and Emotion cache context.
 */
export function MuiProvider({ children }: { children: React.ReactNode }) {
    const cache = createEmotionCache();

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
    );
}
