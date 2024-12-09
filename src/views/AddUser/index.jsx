import {
    TextField,
    InputAdornment,
    IconButton,
    Input,
    InputLabel,
    FormControl,
    Box
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useShowPassword from '../../hooks/useShowPassword';
import { InputDelirioForm } from '../../components/styledComponents';

const AddUser = ({ formik }) => {

    const [showPassword, handleClickShowPassword] = useShowPassword()
    const prevent = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Box component='div' className='margin-field section' >
                <InputDelirioForm
                    id="username"
                    name='username'
                    placeholder='Nombre de usuario'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    required
                    inputProps={{
                        style: {
                            background: "none",
                            border: 0,
                            color: "white",
                        }
                    }}
                />

                <InputDelirioForm
                    id="email"
                    name='email'
                    placeholder='Correo'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    required
                    inputProps={{
                        style: {
                            background: "none",
                            border: 0,
                            color: "white"
                        }
                    }}
                />


            </Box>

            <Box component='div' className='margin-field section'  >

                <InputDelirioForm
                    id="password"
                    name='password'
                    placeholder='Contraseña'
                    type={showPassword ? 'text' : 'password'}
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
                />

                <InputDelirioForm
                    id="phone_number"
                    name='phone_number'
                    placeholder='Telefono'
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                    required
                    inputProps={{
                        style: {
                            background: "none",
                            border: 0,
                            color: "white",
                        }
                    }}
                />

            </Box>
        </>
    )
}

export default AddUser;