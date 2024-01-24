import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { isEmail } from '../../service/auth-service';
import { fetchSignUp } from '../../lib/api/auth.api';

export default function SignUp() {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [surnameError, setSurnameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const dataForSend = { email, ...formData };
            await fetchSignUp(dataForSend);

            navigate('/profile');

        }catch (err:any){
            setError(err.message);
            setIsValid(false);
            console.error(err)
        }

    };

    const handleFormDataValueChange = (field: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        setEmailError(
            email ? (isEmail(email) ? '' : 'Invalid email format') : ''
        );
        setNameError(
            formData.name ? (!/\d/.test(formData.name) ? '' : 'Name should not contain numbers') : ''
        );
        setSurnameError(
            formData.surname ? (!/\d/.test(formData.surname) ? '' : 'Surname should not contain numbers') : ''
        );
        setPasswordError(
            formData.password ? (formData.password.length >= 6 ? '' : 'Password must be at least 5 characters') : ''
        );

        setIsValid(
            (!email || isEmail(email)) &&
            (!formData.password || formData.password.length >= 6) &&
            (!formData.name || !/\d/.test(formData.name)) &&
            (!formData.surname || !/\d/.test(formData.surname)) &&
            Object.values(formData).every((field) => field.length > 0)
        );
    }, [email, formData]);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={formData.name}
                                onChange={(event) =>
                                    handleFormDataValueChange('name', event.target.value)
                                }
                                name="firstName"
                                autoComplete="first-name"
                                error={!!nameError}
                                helperText={nameError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                value={formData.surname}
                                onChange={(event) =>
                                    handleFormDataValueChange('surname', event.target.value)
                                }
                                name="lastName"
                                autoComplete="family-name"
                                error={!!surnameError}
                                helperText={surnameError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                error={!!emailError}
                                id="email"
                                label="Email Address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                name="email"
                                autoComplete="email"
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(event) =>
                                    handleFormDataValueChange('password', event.target.value)
                                }
                                id="password"
                                autoComplete="new-password"
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                        </Grid>
                    </Grid>
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{
                            mt: 1,
                            textAlign: 'center',
                            visibility: !error.length ? 'hidden' : 'visible',
                        }}
                    >
                        {error}
                    </Typography>
                    <Button
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Typography
                                component={Link}
                                to="/sign-in"
                                variant={'body2'}
                                sx={{ textAlign: 'end' }}
                            >
                                Already have an account? Sign in
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
