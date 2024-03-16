import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Dialog, Box, TextField, Typography, Button, styled, useTheme, useMediaQuery} from '@mui/material';

import { authenticateSignup, authenticateLogin} from '../../service/api';

import { DataContext } from '../../context/DataProvider';
import image from './image.png';

const DialogBox = styled(Box)`
    height: 80vh;
    width: calc(100% - 20px); 
    @media (min-width: 600px) { 
        width: 100vh;
    }
`;

const LoginImage = styled(Box)`
    background: #2874f0 url(${image}) center 90% no-repeat;
    height: 81%;
    width: 28%;
    padding: 42px 35px;
    & > p, & > h5{
        color: #fff;
        font-weight: bold;
    }
`;

const Wrapper = styled(Box)`
    display:flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div, & > button, & > p{
        margin-top: 10px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    &:hover {
        background-color: #ff8950;
        color: #fff;
    }
`;

const CreateAccount = styled(Typography)`
   font-size: 12px;
   text-align: center;
   color: #2874f0;
   font-weight: 600;
   cursor: pointer;
`;

const Error = styled(Typography)`
   font-size: 10px;
   color: #ff6161;
   line-height: 0;
   margin-top: 10px;
   font-weight: 600;
`;

const accountInitialValue = {
    login:{
        view: 'login',
        heading: 'Login',
        subHeading: "Get access to your Addresses..."
    },
    signup:
    {
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: "Sign up to get started.."
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    password:''
    
}
const loginInitialValues = {
    username: '',
    password:''
      
}

const LoginDialog = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const [account, toggleAccount] = useState(accountInitialValue.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(false);
    
    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValue.login);
        setError(false);
    };

    const toggleSignup = () => {
        toggleAccount(accountInitialValue.signup);
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.firstname);
        navigate('/main');
    };

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        try {
            let response = await authenticateLogin(login);
            if (response.status === 200) {
                handleClose();
                setAccount(response.data.data.firstname);
                navigate('/main');
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError(true);
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <DialogBox>
                <Box style={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
                    {!isSmScreen && (
                        <LoginImage>
                            <Typography variant='h5'>{account.heading}</Typography>
                            <Typography style={{ marginTop: 30, fontSize: 15 }}>{account.subHeading}</Typography>
                        </LoginImage>
                    )}
                    <Wrapper>
                        {
                            account.view === 'login' ?
                                <>
                                    <TextField variant='standard' onChange={(e) => onValueChange(e)} name="username" label="Enter Username" />
                                    {error && <Error>Please enter valid username or password</Error>}
                                    <TextField variant='standard' onChange={(e) => onValueChange(e)} name="password" label="Enter Password" />
                                    <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                                    <Typography style={{ textAlign: 'center' }}>OR</Typography>
                                    <CreateAccount onClick={() => toggleSignup()}>New to Address Updater? Create an account</CreateAccount>
                                </>
                                :
                                <>
                                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name="firstname" label="Enter Firstname" />
                                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name="lastname" label="Enter Lastname" />
                                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name="username" label="Enter Username" />
                                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name="password" label="Enter Password" />
                                    <LoginButton onClick={() => signupUser()}>Register</LoginButton>
                                    <Typography style={{ textAlign: 'center' }}>OR</Typography>
                                    <CreateAccount onClick={() => toggleAccount(accountInitialValue.login)}>Back to Login</CreateAccount>
                                </>
                        }
                    </Wrapper>
                </Box>
            </DialogBox>
        </Dialog>
    );
}

export default LoginDialog;
