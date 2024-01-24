import React, {useContext} from 'react';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Box,
} from '@mui/material';
import userContext from '../context/user-context';
import {Roles} from '../service/interfaces/user';
import {Link, useNavigate} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {logOut} from "../lib/api/auth.api";


const Header = () => {
    const {user, updateUser} = useContext(userContext);
    const navigate = useNavigate();


    const handleLogOut = async () => {

        await logOut().then(() => {
            updateUser(null);
            navigate('/sign-in');
        })
    }


    return (
        <AppBar component="nav">
            <Toolbar>
                <Button sx={{mr: 2, display: {sm: 'none'}}}>
                    <MenuIcon/>
                </Button>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                >
                    mui
                </Typography>

                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                    {user ? (
                        <>
                            <Link to={'/profile'}>
                                <Button sx={{color: '#fff'}}>profile</Button>
                            </Link>

                            <Button onClick={handleLogOut} sx={{color: '#fff'}}>logOut</Button>
                            {
                                (user.role !== Roles.User) &&
                                <Link to={'/users'}>
                                    <Button sx={{color: '#fff'}}>users</Button>
                                </Link>
                            }
                        </>
                    ) : (
                        <Link to={'/sign-in'}>
                            <Button sx={{color: '#fff'}}>sign in</Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
