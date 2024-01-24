import React, {FC, useState} from 'react';
import {Button, Snackbar} from "@mui/material";
import {IUser, Roles} from "../../service/interfaces/user";
import {toggleUserBanStatus} from "../../lib/api/users.api";

interface BanUserBtnProps {
    user: IUser;
    currentUserRole?: Roles;
}

const BanUserBtn: FC<BanUserBtnProps> = ({user, currentUserRole}) => {
    const [isBanned, setIsBanned] = useState(user.isBanned);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const disabled = user.role === Roles.Admin || currentUserRole !== Roles.Admin;

    const handleBtnClick = async () => {
        try {
            await toggleUserBanStatus(user.id, !isBanned);
            setIsBanned(!isBanned);
            setSnackbarOpen(true);
        }catch (err:any){
            console.error(err)
        }

    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Button variant={'outlined'} color={`${isBanned ? 'primary' : 'error'}`} disabled={disabled}
                    onClick={handleBtnClick}>
                {isBanned ? 'Unban' : 'Ban'}
            </Button>

            <Snackbar open={snackbarOpen}
                      autoHideDuration={6000}
                      onClose={handleSnackbarClose}
                      message={isBanned ? `${user.name} banned.` : `${user.name} unbanned.`}
            />
        </>

    );
};

export default BanUserBtn;
