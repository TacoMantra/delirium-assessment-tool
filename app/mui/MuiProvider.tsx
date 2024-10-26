import { CacheProvider } from '@emotion/react';

import createCache from '@emotion/cache';
import AppTheme from './theme/AppTheme';

function createEmotionCache() {
    return createCache({ key: 'css' });
}

export function MuiProvider({ children }: { children: React.ReactNode }) {
    const cache = createEmotionCache();

    return (
        <CacheProvider value={cache}>
            <AppTheme>{children}</AppTheme>
        </CacheProvider>
    );
}
