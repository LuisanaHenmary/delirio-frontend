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

const AddUser = ({ formik }) => {

    const [showPassword, handleClickShowPassword] = useShowPassword()
    const prevent = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Box component='div' className='margin-field section' >
                <TextField
                    id="username"
                    name='username'
                    label="Username"
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    sx={{ width: '250px' }}
                    required
                />

                <TextField
                    id="email"
                    name='email'
                    label="email"
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    sx={{ width: '250px' }}
                    required
                />


            </Box>

            <Box component='div' className='margin-field section'  >
                <FormControl variant="standard" >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        name='password'
                        type={showPassword ? 'text' : 'password'}
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
                        sx={{ width: '250px' }}
                        required
                    />
                </FormControl>

                <TextField
                    id="phone_number"
                    name='phone_number'
                    label="Telefono"
                    variant="standard"
                    sx={{ width: '250px' }}
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                />
            </Box>



        </>
    )
}

export default AddUser;