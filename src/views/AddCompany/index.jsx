import {
    Box,
    DialogActions,
    Alert
} from '@mui/material';
import AddUser from '../AddUser';
import { useFormik } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCompaniesContext } from '../../hooks/useCompanyContext';
import axios from 'axios';
import { CompanyValidation } from '../../Validations/CompanyValidation';
import { InputDelirioForm, SubmitButton } from '../../components/styledComponents';

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
        validationSchema: CompanyValidation
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
                <InputDelirioForm
                    id="nit"
                    name='nit'
                    placeholder='NIT'
                    onChange={formik.handleChange}
                    value={formik.values.nit}
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
                    id="full_name"
                    name='full_name'
                    placeholder='Nombre completo'
                    onChange={formik.handleChange}
                    value={formik.values.full_name}
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

            <AddUser formik={formik} />

            {formik.errors.nit ? (
                <Alert severity="error">{formik.errors.nit}</Alert>
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

export default AddCompany;