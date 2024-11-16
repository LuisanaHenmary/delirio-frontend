import {
    Box,
    Button,
    DialogActions,
    TextField
} from '@mui/material';
import AddUser from '../AddUser';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCompaniesContext } from '../../hooks/useCompanyContext';
import axios from 'axios';

const AddCompany = ({ handleClose }) => {

    const { user } = useAuthContext()
    const { dispatchCompanies } = useCompaniesContext()

    const formik = useFormik({
        initialValues: {
            nit: '',
            full_name: '',
            phone_number: '',
            username: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            register_company(values)
            handleClose()
        },
    });

    const register_company = async (values) => {

        const apiUrl = import.meta.env.VITE_API_URL
        const apiUrlWordpress = import.meta.env.VITE_API_WORDPRESS

        const {
            nit,
            full_name,
            phone_number,
            username,
            email,
            password
        } = values;


        try {
            const response = await axios({
                method: 'post',
                url: `${apiUrlWordpress}/users/`,
                data: {
                    'username': username,
                    'email': email,
                    'password': password,
                    'roles': [
                        "company"
                    ],
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const id_user = await response.data.id

            const response2 = await axios({
                method: 'post',
                url: `${apiUrl}/companies`,
                data: {
                    'nit': nit,
                    'name': full_name,
                    'phone': phone_number,
                    'id_user': id_user
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const company_info = await response2.data['company']

            dispatchCompanies({ type: 'CREATE_COMPANY', payload: company_info })

        } catch (e) {
            console.log(e)
        }


    }

    return (

        <Box className="form-employer" component="form" onSubmit={formik.handleSubmit}>

            <Box component='div' className='margin-field section'  >
                <TextField
                    id="nit"
                    name='nit'
                    label="NIT"
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.nit}
                    sx={{ width: '250px' }}
                />

                <TextField
                    id="full_name"
                    name='full_name'
                    label="Nombre"
                    variant="standard"
                    onChange={formik.handleChange}
                    value={formik.values.full_name}
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

export default AddCompany;