import { useState, useContext } from 'react';
import LoginDialog from '../login/loginDialog';
import { DataContext } from '../../context/DataProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, styled, Box, Drawer, List, ListItem, ListItemText, IconButton, useTheme, useMediaQuery, Grid} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "./logo.png";

const StyledAppBar = styled(AppBar)`
    margin-top: 0;
`;

const StyledTypography = styled(Typography)`
    flex-grow: 1;
`;

const StyledButton = styled(Button)`
    background-color: #ffa500; 
    color: #fff;
    &:hover {  
        background-color: #fff; 
        color: #ffa500; 
    }
`;

//&->current component

const Header = ({ setUser}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();

    const isSmOrDown = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmOrUp = useMediaQuery(theme.breakpoints.up('sm'));
    const isMdOrUp = useMediaQuery(theme.breakpoints.up('md'));
    const isMdOrDown = useMediaQuery(theme.breakpoints.down('md'));

    //useMediaQuery hook allows to reder components based on condition, (size of device)
   

    const [openDrawer, setOpenDrawer] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const { account, setAccount } = useContext(DataContext);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const openLogin = () => {
        setOpenLoginDialog(true);
        setUser(true);
    };

    const closeLoginDialog = () => {
        setOpenLoginDialog(false);
    };

    const handleCloseLoginDialog = () => {
        setOpenLoginDialog(false);
    };

    const handleLogout = () => {
        setAccount(null);
        navigate('/');
    }

    const handleAddressRecord = () => {
        if (location.pathname === '/allrecords') {
            navigate('/main');
        } else {
            navigate('/allrecords');
        }
    }

    return (
        <Box>
            <StyledAppBar position="static">
                <Toolbar>
                    {isSmOrDown && (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDrawerOpen}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <StyledTypography variant="h6">
                                <img src={logo} alt="logo" style={{ height: '40px', marginLeft : '370px', marginTop :'10px'}} />
                            </StyledTypography>
                        </>
                    )}
                    
                    {isMdOrUp &&  (
                        <Grid container alignItems="center" justifyContent="space-between">
                            <StyledTypography variant="h6">
                                <img src={logo} alt="logo" style={{ height: '40px', marginTop : '10px'}} />
                            </StyledTypography>
                            <Grid item>
                                {account ? (
                                    <>
                                        <Box style={{display : 'flex'}}>
                                        
                                                <Typography variant="h6" style={{marginRight : '650px'}}>Address Manager</Typography>
                                            
                                                <Typography variant="h6" sx={{ marginRight: '20px' }}>{account}</Typography>
                                                <StyledButton variant="contained" onClick={() => handleLogout()} sx={{ marginRight: '10px' }}>Logout</StyledButton>
                                                <StyledButton variant="contained" onClick={handleAddressRecord}>
                                                    {location.pathname === '/allrecords' ? 'New Entry' : 'Address Record'}
                                                </StyledButton>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Button color="inherit" onClick={openLogin}>Login</Button>
                                        <Button color="inherit">About Us</Button>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    )}
                    {
                        isSmOrUp && isMdOrDown && (
                        <Grid container alignItems="center" justifyContent="space-between">
                            <StyledTypography variant="h6">
                                <img src={logo} alt="logo" style={{ height: '40px', marginTop : '10px'}} />
                            </StyledTypography>
                            <Grid item>
                                {account ? (
                                    <>
                                        <Box style={{display : 'flex'}}>
                                        
                                        <Typography variant="h6" style={{marginRight : '190px'}}>Address Manager</Typography>
                                     
                                        <Typography variant="h6" sx={{ marginRight: '20px' }}>{account}</Typography>
                                        <StyledButton variant="contained" onClick={() => handleLogout()} sx={{ marginRight: '10px' }}>Logout</StyledButton>
                                        <StyledButton variant="contained" onClick={handleAddressRecord}>
                                            {location.pathname === '/allrecords' ? 'New Entry' : 'Address Record'}
                                        </StyledButton>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Button color="inherit" onClick={openLogin}>Login</Button>
                                        <Button color="inherit">About Us</Button>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    )}
                   
                </Toolbar>
            </StyledAppBar>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerClose}
            >
                <List>
                    {account ? (
                        <>
                            <ListItem button key="Logout" onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItem>
                            <ListItem button key="Address Record" onClick={handleAddressRecord}>
                                <ListItemText primary={location.pathname === '/allrecords' ? 'New Entry' : 'Address Record'} />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button key="Login" onClick={openLogin}>
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button key="About Us" onClick={handleDrawerClose}>
                                <ListItemText primary="About Us" />
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
            <LoginDialog open={openLoginDialog} handleClose={handleCloseLoginDialog} setOpen={setOpenLoginDialog} />
        </Box>
    );
}

export default Header;



// XS (Extra Small): Up to 599.99px
// SM (Small): 600px - 959.99px
// MD (Medium): 960px - 1279.99px
// LG (Large): 1280px and above