import { CssBaseline } from '@mui/material';

/**
 * A wrapper component that applies Material-UI's CSS baseline styles.
 *
 * This component ensures consistent styling across browsers by including the
 * `CssBaseline` component from Material-UI. It also renders any children passed to it.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to render inside the component.
 * @returns {JSX.Element} The component wrapped with Material-UI's baseline styles.
 */
export function MuiDocument({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CssBaseline />
            {children}
        </>
    );
}
