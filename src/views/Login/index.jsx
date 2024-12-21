import {
    Box,
    InputAdornment,
    Typography,
    Button,
    Alert,
    Container,
    Stack,
    ListItem,
    IconButton,
    CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import useShowPassword from '../../hooks/useShowPassword';
import { useLogin } from '../../hooks/useLogin';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { DelirioInput } from './styled';
import { useEffect } from 'react';

import axios from 'axios';

const Login = () => {

    const [showPassword, handleClickShowPassword] = useShowPassword()
    const { login, error, isLoading, dispatch } = useLogin()

    const prevent = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            login(values.username, values.password)
        },
    });

    const isOpenSession = async () => {

        const apiWordpress = import.meta.env.VITE_API_WORDPRESS
        const currentUser = JSON.parse(localStorage.getItem('user'))

        if (currentUser) {
            const response = await axios({
                method: 'get',
                url: `${apiWordpress}/users/me`,
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`,
                },
            });

            if (response.status === 200) {
                dispatch({ type: 'LOGIN', payload: currentUser })
            }
        }

    }

    useEffect(() => {

        try {
            isOpenSession()
        } catch (e) {
            console.log(e)
        }

    }, [])

    return (
        <Box component="div" className='background-login' >

            <Box sx={{ display: "flex" }}>
                <Container className='form-center'>
                    {isLoading ?
                        <Box className="main-box" >
                            <CircularProgress />
                        </Box>
                        :
                        <Stack className='main-form' >
                            <Typography variant='h6' component="div" className='title-login' >
                                <strong>Inicio de sesión</strong>

                                <ListItem sx={{ height: "25px", width: "50px" }} disablePadding component='a' href="http://localhost/Delirio" >
                                    <IconButton >
                                        <CancelPresentationIcon />
                                    </IconButton>
                                </ListItem>

                            </Typography>

                            <Box className="form-login" component="form" onSubmit={formik.handleSubmit}>

                                <DelirioInput
                                    id="username"
                                    name='username'
                                    placeholder='Usuario'
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SensorOccupiedIcon sx={{ color: "white" }} />
                                        </InputAdornment>

                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    inputProps={{
                                        style: {
                                            background: "none",
                                            border: 0,
                                            color: "white",
                                            borderRadius: "20px",
                                        }
                                    }}
                                    fullWidth
                                    required
                                />

                                <DelirioInput
                                    id="password"
                                    name='password'
                                    placeholder='Contraseña'
                                    type={showPassword ? 'text' : 'password'}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <FingerprintIcon sx={{ color: "white" }} />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={prevent}
                                                onMouseUp={prevent}
                                            >
                                                {showPassword ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    inputProps={{
                                        style: {
                                            background: "none",
                                            border: 0,
                                            color: "white",
                                        }
                                    }}
                                    required
                                    fullWidth
                                />

                                <Button className='agree-button' variant='contained' type='submit'>
                                    <strong>Aceptar</strong>
                                </Button>
                                {error && <Alert severity="error">{error}</Alert>}

                            </Box>

                        </Stack>}
                </Container>

            </Box>
        </Box>
    )
}

export default Login;