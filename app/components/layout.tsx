import * as React from 'react';
import { Container, Box } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>{children}</Box>
        </Container>
    );
}
