import * as React from 'react';
import {
    styled,
    Box,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Container,
    Divider,
    MenuItem,
    Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
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
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

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
                            display: { xs: 'none', md: 'flex' },
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
                    <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                        <IconButton
                            aria-label="Menu button"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                        >
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: 'background.default',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                {isAuthed ? (
                                    <>
                                        <MenuItem>Dashboard</MenuItem>
                                        <MenuItem>New Patient</MenuItem>
                                        <MenuItem>All Patients</MenuItem>
                                        <MenuItem>
                                            <form
                                                method="post"
                                                action="/logout"
                                            >
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    variant="outlined"
                                                    fullWidth
                                                >
                                                    Sign out
                                                </Button>
                                            </form>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <Link to="/">Home</Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to="/signup">Sign Up</Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to="/login">Sign In</Link>
                                        </MenuItem>
                                    </>
                                )}
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
