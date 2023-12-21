import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ApiEndpoints from '../services/ApiEndpoints'
import { Api } from '../services/Api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const UserTable = ({ handelEditOpen, open }) => {
    const [loader, setLoader] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => { getUsers() }, [open])
    const naviget = useNavigate();


    // get all users
    const getUsers = async () => {
        try {
            const res = await Api.get(ApiEndpoints.user.getUsers)
            console.log(res.data.data.users, 'ddddd');
            if (res.data?.data?.users?.length) {
                setUsers(res.data.data.users)
            }
        } catch (err) {
            toast.error("somthing want wrong")
        } finally {
            setLoader(false);
        }
    }

    const handleDeleteUser = async (userId) => {
        const isYes = window.confirm("Are you sure you want to delete this user?")
        if (isYes) {
            try {
                const data = await Api.delete(`${ApiEndpoints.user.removeUserById}/${userId}`)
                if (data.status === 200) {
                    toast.success('User removed')
                    getUsers()
                }
            } catch (err) {
                toast.error("User not removed")
            } finally {
                getUsers()
            }
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.status ? "Active" : "InActive"}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => { handelEditOpen(user._id) }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDeleteUser(user._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
