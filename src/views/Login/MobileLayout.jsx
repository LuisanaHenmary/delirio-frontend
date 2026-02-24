import {
    Box,
    InputAdornment,
    Button,
    Alert,
    Container,
    Stack,
    IconButton,
    CircularProgress,
    Paper
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import useShowPassword from '../../hooks/useShowPassword';
import { useLogin } from '../../hooks/useLogin';
import { useLogout, useClear } from '../../hooks/useLogout';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { DelirioInput } from './styled';
import { useEffect } from 'react';

import axios from 'axios';
import IconDeer from "../../assets/IconDeer.svg"

const MobileLayout = () => {

    const [showPassword, handleClickShowPassword] = useShowPassword()
    const { login, error, isLoading, dispatch } = useLogin()
    const { logout } = useLogout()
    const { clearLists } = useClear()

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
            try {
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
            } catch (e) {
                logout()
                clearLists()
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
        <Box
            sx={{
                minHeight: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2
            }}
        >
            { isLoading?<CircularProgress />:<Container maxWidth="xs">
                <Paper sx={{
                    paddingTop:0,
                    paddingLeft:3,
                    paddingRight:3,
                    paddingBottom:7,
                    borderRadius: "30px",
                    position: 'relative',
                }}
                elevation={3}
                >

                    <Box
                        component="img"
                        src={IconDeer}
                        alt="Borde"
                        sx={{
                            position: 'absolute',
                            top: -50, // Ajusta la posición vertical para salir del borde
                            left: '50%',
                            transform: 'translateX(-50%)', // Centra la imagen horizontalmente
                            width: 103,
                            height: 103,
                            borderRadius: '50%', // Opcional: hace la imagen redonda
                            border: '2px solid white' // Opcional: contorno blanco
                        }}
                    />
                   {/*  <Box>

                    </Box> */}
                    <Stack spacing={5} sx={{paddingTop:10}} component="form" onSubmit={formik.handleSubmit}>

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

                        <Button className='agree-button' variant='contained' type='submit' fullWidth>
                            <strong>ACEPTAR</strong>
                        </Button>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Stack>
                </Paper>
            </Container> }
        </Box>
    )
}

export default MobileLayout;

/* <Box component="div">

            <Box sx={{ display: "flex" }}>
                <Container className='form-center'>
                    {isLoading ?
                        <Box className="main-box" >
                            <CircularProgress />
                        </Box>
                        :
                        <Stack className='main-form' >

                            <Box className="form-login" component="form" onSubmit={formik.handleSubmit}>

                                

                            </Box>

                        </Stack>}
                </Container>

            </Box>
        </Box> */