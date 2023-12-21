import React from 'react'
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import UserTable from '../components/UserTable';
import AddEditUser from '../components/AddEditUser';

const Users = () => {
    const [open, setOpen] = React.useState(false);
    const [userID, setUserID] = React.useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setUserID(null); setOpen(false) };

    const handelEditOpen = (id) => {
        setUserID(id)
        handleOpen()
    }

    return (
        <>
            <Stack direction="row-reverse">
                <Button
                    variant='contained'
                    sx={{ textTransform: "none", width: "140px" }}
                    onClick={handleOpen}>
                    Create User
                </Button>
            </Stack>
            <AddEditUser open={open} handleClose={handleClose} userId={userID} />
            <UserTable handelEditOpen={handelEditOpen} open={open} />
        </>
    )
}

export default Users