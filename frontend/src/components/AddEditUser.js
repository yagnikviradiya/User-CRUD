import React, { useEffect, useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
    Link,
    CircularProgress,
    Modal,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import regExValidation from '../helpers/validations';
import { Api } from '../services/Api';
import { toast } from 'react-toastify';
import ApiEndpoints from '../services/ApiEndpoints';
import { useNavigate } from 'react-router-dom';


const AddEditUser = ({ userId, open, handleClose }) => {
    const [formData, setFormData] = useState({
        status: 'active',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear individual field errors when user types
        setErrors({ ...errors, [e.target.name]: '' });
    };

    useEffect(() => {
        const getUser = async () => {
            if (userId) {

                try {
                    let res = await Api.get(`${ApiEndpoints.user.getUserById}/${userId}`)
                    const data = res?.data
                    console.log(data, 'datadatadata');
                    if (res?.status === 200) {
                        const user = res?.data.data
                        setFormData({
                            status: user.status ? "active" : "inActive",
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: Number(user.phone),
                        });
                    } else { toast.error("somthing want wrong") }
                } catch (err) {
                    console.log(err, 'err');
                    toast.error(err?.response?.data?.message ?? 'something want to wrong')
                }

            }
        }
        getUser();
    }, [userId, open])

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!regExValidation.email(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone) {
            newErrors.phone = 'phone is required';
        }
        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            // Set individual field errors
            setErrors(newErrors);
            return;
        }

        // Reset errors
        setErrors({});

        // API call for Add edit user
        try {
            setLoader(true)
            const dataTobeSent = { ...formData }
            if (userId) {
                dataTobeSent.userId = userId
            }
            dataTobeSent.status = dataTobeSent.status === "active"
            let res = await Api.post(ApiEndpoints.user.createOrUpdateUser, dataTobeSent)
            const data = res?.data
            console.log(data, 'datadatadata');
            if (res?.status === 200) {
                toast.success(data.message)
                handleClose();
                setFormData({
                    status: true,
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                });
            } else { toast.error("somthing want wrong") }
        } catch (err) {
            console.log(err, 'err');
            toast.error(err?.response?.data?.message ?? 'something want to wrong')
        } finally {
            setLoader(false)
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setFormData({
                    status: true,
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                });
                handleClose()
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper elevation={3} sx={{ width: "500px", margin: "0px auto", marginTop: '80px', padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" align="center" mb={2}>
                    {userId ? "Edit User" : "Add user"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    label="Status"
                                >
                                    <MenuItem value="active">Acticve</MenuItem>
                                    <MenuItem value="inActive">In Active</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="First name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="text"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                type="number"
                                value={formData.phone}
                                onChange={handleChange}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        startIcon={loader ? <CircularProgress color='inherit' /> : null}
                        type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        {userId ? "Edit user" : "Add user"}
                    </Button>
                </form>
            </Paper>
        </Modal>
    );
};

export default AddEditUser;
