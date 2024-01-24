import React, {useContext, useEffect, useState} from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from "@mui/material";
import Paper from '@mui/material/Paper'
import Container from "@mui/material/Container";
import {IUser} from "../../service/interfaces/user";
import {fetchUserByToken, fetchUsers} from "../../lib/api/users.api";
import BanUserBtn from "./BanUserBtn";
import {useNavigate} from "react-router-dom";
import userContext from "../../context/user-context";

const UsersTablePage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const limit = 2;

    const navigate = useNavigate();

    const {user: currentUser, updateUser} = useContext(userContext);

    const getUsers = async (page: number) => {
        try {
            const {data} = await fetchUsers(page, limit);
            if (data) {
                setTotalPages(data.totalPages);
                setUsers(data.data);
            }
        }catch (err){
            console.error(err)
        }

    }

    async function fetchUserData() {
  try {
      const {data} = await fetchUserByToken();
      if (data) {
          updateUser(data);
      }

  }catch (err:any){
      if (err.response.status === 401) {
          return navigate('/sign-in')
      }
  }
    }



    const handleChangePage = async (event: any, newPage: number) => {
        setPage(newPage);
        await getUsers(newPage + 1);
    };


    useEffect(() => {
        getUsers(1)
            .then(() => fetchUserData())
            .then(() => setIsLoading(false))
            .catch((err)=>console.error(err))
    }, []);

    if (isLoading || !currentUser) {
        return <p>...loading</p>;
    }

    return (
        <Container>
            <TableContainer sx={{marginTop: 15}} component={Paper}>
                <Table sx={{minWidth: 300}} aria-label="users-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'}>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell align={'left'}>Email</TableCell>
                            <TableCell align={'center'}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.length > 0 && users.map((user) => (
                            <TableRow key={user.id}
                                      sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component={'th'} scope={'row'}>
                                    {user.name}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {user.surname}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'}>
                                    {user.email}
                                </TableCell>
                                <TableCell component={'th'} scope={'row'} align={"center"}>
                                    <BanUserBtn user={user} currentUserRole={currentUser?.role}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[limit]}
                    component="div"
                    count={totalPages * limit}
                    page={page}
                    rowsPerPage={limit}
                    onPageChange={handleChangePage}/>
            </TableContainer>
        </Container>
    );
};

export default UsersTablePage;
