import { styled, Box, AppBar, Toolbar, Button, Container } from '@mui/material';
import logo from '../assets/logo.png';
import { Link } from '@remix-run/react';

interface IAppAppBarProps {
    isAuthed: boolean;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar({ isAuthed }: IAppAppBarProps) {
    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 10,
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            px: 0,
                        }}
                    >
                        <img
                            src={logo}
                            width="32"
                            height="32"
                            alt="Delirium Assessment Tool Logo"
                        />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {isAuthed ? (
                                <>
                                    <Button
                                        variant="text"
                                        color="info"
                                        size="small"
                                        component={Link}
                                        to="/home"
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="info"
                                        size="small"
                                        component={Link}
                                        to="/new-patient"
                                    >
                                        New Patient
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="info"
                                        size="small"
                                    >
                                        All Patients
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="text"
                                        color="info"
                                        size="small"
                                        component={Link}
                                        to="/"
                                    >
                                        Home
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {isAuthed ? (
                            <form method="post" action="/logout">
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="text"
                                    size="small"
                                >
                                    Sign Out
                                </Button>
                            </form>
                        ) : (
                            <>
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="small"
                                    component={Link}
                                    to="/signup"
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="text"
                                    size="small"
                                    component={Link}
                                    to="/login"
                                >
                                    Sign In
                                </Button>
                            </>
                        )}
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
