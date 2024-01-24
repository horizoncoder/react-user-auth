import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from "./layouts/Layout";
import SignInPage from "./pages/auth/SignInPage";
import PrivateRoute from "./features/PrivateRoute";
import ProfilePage from "./pages/users/ProfilePage";
import SignUpPage from "./pages/auth/SignUpPage";
import userContext from "./context/user-context";
import UsersTablePage from "./pages/users/UsersTablePage";
import {Roles} from "./service/interfaces/user";
import {Button, Typography} from "@mui/material";
import {Container, Box} from "@mui/material"
import {logOut} from "./lib/api/auth.api";

const App = () => {
    const {user, updateUser} = useContext(userContext);
    const handleLogOut = async () => {
        await logOut().then(() => {
            updateUser(null);
            window.location.href = '/sign-in';
        })
    }

    if (user && user.isBanned) {
        return (
            <Container>
                <Box  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                }}>
                    <Typography variant={'h3'} sx={{textAlign: 'center'}}>
                        You are banned by admin
                    </Typography>
                    <Button onClick={handleLogOut} variant={'outlined'} color={'error'} sx={{mt: '10px'}}>
                        LogOut
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/sign-in" element={
                        <SignInPage/>
                    }/>
                    <Route path="/sign-up" element={
                        <SignUpPage/>
                    }/>
                    <Route path="/users" element={
                        <PrivateRoute hasPermission={user?.role !== Roles.User}>
                            <UsersTablePage/>
                        </PrivateRoute>
                    }/>

                    <Route path="/profile" element={
                        <ProfilePage/>
                    }/>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
