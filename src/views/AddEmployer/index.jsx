import {
    Box,
    DialogActions,
    MenuItem,
    Typography,
    Alert
} from '@mui/material';
import AddUser from '../AddUser';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import "./index.css"
import { useJobContext } from '../../hooks/useJobContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEmployersContext } from '../../hooks/useEmployersContext';
import axios from 'axios';
import { EmployerValidation } from '../../Validations/EmpleyerValidation';
import { getEmployers } from '../../api';
import { InputDelirioForm, DelirioSelectForm, SubmitButton } from '../../components/styledComponents';
import Swal from 'sweetalert2'


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
            job: ''
        },
        onSubmit: values => {

            register_employer(values)
            handleClose()
        },
        validationSchema: EmployerValidation
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

            if (response2.status === 200) {
                getEmployers(user, dispatchEmployers)
            }



        } catch (e) {
            if (e.status === 500) {
                const message = e.response.data.message

                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            } else {
                console.log(e)
            }
        }

    }

    return (

        <Box className="form-employer" component="form" onSubmit={formik.handleSubmit}>
            <Box component='div' className='margin-field section' >


                <DelirioSelectForm
                    value={formik.values.job}
                    inputProps={{
                        name: 'job',
                        id: 'job',
                    }}
                    onChange={formik.handleChange}
                    displayEmpty
                >
                    <MenuItem value='' >
                        <em>Cargo</em>
                    </MenuItem >

                    {jobs.map((elem, index) => (
                        <MenuItem key={index} value={`${index}`} >
                            {elem.name_job}
                        </MenuItem >
                    ))}

                </DelirioSelectForm>


                <InputDelirioForm
                    id="ci"
                    name='ci'
                    placeholder="CI"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.ci}
                    inputProps={{
                        style: {
                            background: "none",
                            border: 0,
                            color: "white",
                        }
                    }}
                    required
                />

            </Box>

            <Box component='div' className='margin-field section' >

                <InputDelirioForm
                    id="full_name"
                    name='full_name'
                    placeholder="Nombre"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.full_name}
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
                    id="address"
                    name='address'
                    placeholder="Direccion"
                    variant="outlined"
                    onChange={formik.handleChange}
                    inputProps={{
                        style: {
                            background: "none",
                            border: 0,
                            color: "white",
                        }
                    }}
                />

            </Box>


            <AddUser formik={formik} />

            {formik.errors.job ? (
                <Alert severity="error">{formik.errors.job}</Alert>
            ) : null}


            {formik.errors.ci ? (
                <Alert severity="error">{formik.errors.ci}</Alert>
            ) : null}

            {formik.errors.username ? (
                <Alert severity="error">{formik.errors.username}</Alert>
            ) : null}

            {formik.errors.email ? (
                <Alert severity="error">{formik.errors.email}</Alert>
            ) : null}

            {formik.errors.password ? (
                <Alert severity="error">{formik.errors.password}</Alert>
            ) : null}

            <DialogActions>
                <SubmitButton endIcon={<SendIcon />} type='submit'>
                    Registrar
                </SubmitButton>
            </DialogActions>
        </Box>
    )
}

export default AddEmployer;