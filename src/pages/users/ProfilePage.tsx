import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { fetchUserByToken, updateUserInfo, deleteUser } from '../../lib/api/users.api';
import UserContext from '../../context/user-context';
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>('');
    const [editedSurname, setEditedSurname] = useState<string>('');
    const navigate = useNavigate();

    const { user, updateUser } = useContext(UserContext);

    async function fetchUserData() {
        try {
            const {data} = await fetchUserByToken();

            if (data) {
                updateUser(data);
                setEditedName(data.name);
                setEditedSurname(data.surname);
            }

        }catch (err:any){
            if(err.response.status === 404) {
                return navigate('/sign-in')
            }
            console.error(err)
        }

    }
    useEffect(() => {
        fetchUserData().then(()=>setIsLoading(false))
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const {data} = await updateUserInfo({
                name: editedName,
                surname: editedSurname,
            });

            if (data) {
                updateUser(data);
                setIsEditing(false);
                await fetchUserData()
            }

        }catch (err: any){
            console.error(err)
        }

    };
    const handleDelete = async () => {
        await deleteUser().then(()=>{
            updateUser(null);
            navigate('/sign-in')
        }).catch(err=> console.error(err))
    }
    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="body1">...loading</Typography>
                </CardContent>
            </Card>
        );
    }

    if (!user) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="body1">No Data</Typography>
                </CardContent>
            </Card>
        );
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Profile
                    </Typography>
                    {isEditing ? (
                        <>
                            <TextField
                                label="Name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Surname"
                                value={editedSurname}
                                onChange={(e) => setEditedSurname(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <br />
                            <Button
                                onClick={handleSave}
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="body1" gutterBottom>
                                email: {user.email }
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Name: {user.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Surname: {user.surname}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                isBanned: {!user.isBanned && "NO" }
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                role: {user.role}
                            </Typography>
                            <Button
                                onClick={handleEdit}
                                variant="outlined"
                                color="primary"
                            >
                                Edit
                            </Button>
                            <Box sx={{ marginTop: 1 }}>
                                <Button
                                    onClick={handleDelete}
                                    variant="outlined"
                                    color="secondary"
                                >
                                    Delete Account
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfilePage;
