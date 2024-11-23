import { createContext, useContext } from 'react';

const AuthContext = createContext<string | null>(null);

/**
 * Provides authentication context to its children.
 *
 * This component uses React's `Context` API to provide the `userId` value
 * to any descendants that call the `useAuth` hook.
 *
 * @param {Object} props - The component props.
 * @param {string | null} props.userId - The authenticated user's ID, or `null` if not authenticated.
 * @param {React.ReactNode} props.children - The child components that require access to the authentication context.
 * @returns {JSX.Element} A provider component wrapping the children with authentication context.
 */
export default function AuthProvider({
    userId,
    children,
}: {
    userId: string | null;
    children: React.ReactNode;
}) {
    return (
        <AuthContext.Provider value={userId}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
