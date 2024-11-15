
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Input,
    Typography,
    Button,
    InputLabel,
    FormControl,
    Alert,
    Container
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import useShowPassword from '../../hooks/useShowPassword';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {

    const [showPassword, handleClickShowPassword] = useShowPassword()
    const { login, error, isLoading } = useLogin()

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

    return (

        <Container className='form-center'>
            <Box className="form-login" component="form" onSubmit={formik.handleSubmit}>

                <Typography variant="h3" gutterBottom>
                    Login
                </Typography>

                <TextField
                    id="username"
                    name='username'
                    label="Username"
                    variant="standard"
                    component="div"
                    sx={{ marginBottom: 5 }}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    required
                />

                <FormControl variant="standard">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        sx={{ marginBottom: 5 }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={prevent}
                                    onMouseUp={prevent}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />
                </FormControl>


                <Button variant="contained" endIcon={<SendIcon />} type='submit'>
                    Iniciar sesion
                </Button>
                {error && <Alert severity="error">{error}</Alert>}

            </Box>
        </Container>
    )
}

export default Login;