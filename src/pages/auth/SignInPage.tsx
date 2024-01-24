import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useEffect, useState} from "react";
import {fetchSignIn} from "../../lib/api/auth.api";
import {Link, useNavigate} from "react-router-dom";
import {isEmail} from "../../service/auth-service";


export default function SignInPage() {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await fetchSignIn(email, password);
            navigate('/profile');
        }catch (err: any){
            setIsValid(false);
            setError(err.message);
            console.error(err)
        }

    };

    useEffect(() => {
        setError('');
        setIsValid(isEmail(email) && password.length >= 5);
    }, [email, password]);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type={'email'}
                        label="Email Address"
                        value={email}
                        error={!!error}
                        onChange={(event) => setEmail(event.target.value)}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        onChange={(event) => setPassword(event.target.value.trim())}
                        value={password}
                        name="password"
                        label="Password"
                        type="password"
                        error={!!error}
                        id="password"
                        autoComplete="current-password"
                    />
                    <Typography variant="body2" color="error"
                                sx={{mt: 1, textAlign: 'center', visibility: !error.length ? 'hidden' : 'visible'}}>
                        {error}
                    </Typography>
                    <Button
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography component={Link} to="/sign-up" variant={'body2'} sx={{textAlign: 'end'}}>
                            Dont have account? Sign Up
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
