import {
    Box,
    Button,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import AddUser from '../AddUser';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import "./index.css"
import { useJobContext } from '../../hooks/useJobContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEmployersContext } from '../../hooks/useEmployersContext';
import axios from 'axios';

const AddEmployer = ({ handleClose }) => {

    const { jobs } = useJobContext()
    const { user } = useAuthContext()
    const { dispatchEmployers } = useEmployersContext()

    const formik = useFormik({
        initialValues: {
            ci: '',
            full_name: '',
            address: '',
            phone_number: '',
            username: '',
            email: '',
            password: '',
            job: 0
        },
        onSubmit: values => {

            register_employer(values)
            handleClose()
        },
    });


    const register_employer = async (values) => {

        const apiUrl = import.meta.env.VITE_API_URL
        const apiUrlWordpress = import.meta.env.VITE_API_WORDPRESS

        const {
            ci,
            full_name,
            address,
            phone_number,
            username,
            email,
            password,
            job
        } = values;



        const id = parseInt(jobs[job].id_job)

        try {
            const response = await axios({
                method: 'post',
                url: `${apiUrlWordpress}/users/`,
                data: {
                    'username': username,
                    'email': email,
                    'password': password,
                    'roles': [
                        "employer"
                    ],
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const id_user = await response.data.id

            const response2 = await axios({
                method: 'post',
                url: `${apiUrl}/employers`,
                data: {
                    'ci': ci,
                    'name': full_name,
                    'phone': phone_number,
                    'address': address,
                    'id_job': id,
                    'id_user': id_user
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const employer_info = await response2.data['employer']
            dispatchEmployers({ type: 'CREATE_EMPLOYER', payload: employer_info })


        } catch (e) {
            console.log(e)
        }


    }

    return (

        <Box className="form-employer" component="form" onSubmit={formik.handleSubmit}>
            <Box component='div' className='margin-field section' >

                <Select
                    value={formik.values.job}
                    inputProps={{
                        name: 'job',
                        id: 'job',
                    }}
                    onChange={formik.handleChange}
                    sx={{ width: '200px' }}
                >

                    {jobs.map((elem, index) => (
                        <MenuItem key={index} value={index} >
                            <Typography >{elem.name_job}</Typography>
                        </MenuItem >
                    ))}

                </Select>


                <TextField
                    id="ci"
                    name='ci'
                    label="CI"
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.ci}
                    sx={{ width: '250px' }}
                />

            </Box>

            <Box component='div' className='margin-field section' >

                <TextField
                    id="full_name"
                    name='full_name'
                    label="Nombre"
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.full_name}
                    sx={{ width: '250px' }}
                />

                <TextField
                    id="address"
                    name='address'
                    label="Direccion"
                    variant="standard"
                    onChange={formik.handleChange}
                    sx={{ width: '250px' }}
                />

            </Box>


            <AddUser formik={formik} />

            <DialogActions>
                <Button variant="contained" endIcon={<SendIcon />} type='submit'>
                    Registrar
                </Button>
            </DialogActions>
        </Box>
    )
}

export default AddEmployer;