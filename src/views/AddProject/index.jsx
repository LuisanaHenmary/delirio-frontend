import axios from 'axios';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Typography,
    Alert,
    IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCompaniesContext } from '../../hooks/useCompanyContext';
import { useProjectsContext } from '../../hooks/useProjectsContexr';
import { TextArea } from './styledTheme';
import { InputDelirioForm, DelirioSelectForm, SubmitButton } from '../../components/styledComponents';
import { ProjectValidation } from '../../Validations/ProjectValidation';
import CloseIcon from '@mui/icons-material/Close';


const AddProject = ({ open, handleClose }) => {

    const { user } = useAuthContext()
    const { companies } = useCompaniesContext()
    const { dispatchProjects } = useProjectsContext()

    const formik = useFormik({
        initialValues: {
            nameProject: '',
            descriptionProject: '',
            company: '',

        },
        onSubmit: values => {
            sendInfo(values)
            handleClose()
        },
        validationSchema: ProjectValidation
    });

    const sendInfo = async (values) => {

        const apiUrl = import.meta.env.VITE_API_URL

        const { nameProject, descriptionProject, company } = values

        const id = parseInt(companies[company]['id_company'])

        const response = await axios({
            method: 'post',
            url: `${apiUrl}/projects`,
            data: {
                'name': nameProject,
                'description': descriptionProject,
                'company': id,
            },
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const data = response.data['project']

        dispatchProjects({ type: 'CREATE_PROJECT', payload: data })
        formik.resetForm()
    }

    return (
        <Dialog
            onClose={() => handleClose()}
            open={open} PaperComponent='div'
            PaperProps={{
                'className': 'round-form'
            }}
        >
            <DialogTitle component='div' className="title-card">
                <Typography variant='h4' component='h4' fontWeight='bold' color="white" >
                    Nuevo perfil
                </Typography>
                <IconButton onClick={() => handleClose()} >
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={formik.handleSubmit}>


                    <Box component='div' className='margin-field section' >
                        <InputDelirioForm
                            id="nameProject"
                            name='nameProject'
                            placeholder='Nombre del proyecto'
                            onChange={formik.handleChange}
                            value={formik.values.nameProject}
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

                        {
                            companies.length > 0 && (
                                <DelirioSelectForm
                                    value={formik.values.company}
                                    inputProps={{
                                        name: 'company',
                                        id: 'company',
                                    }}
                                    onChange={formik.handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value='' >
                                        <em>Cliente</em>
                                    </MenuItem >

                                    {companies.map((elem, index) => (
                                        <MenuItem key={index} value={index} >
                                            <Typography >{elem.name_company}</Typography>
                                        </MenuItem >
                                    ))}

                                </DelirioSelectForm>
                            )
                        }
                    </Box>

                    <TextArea
                        name='descriptionProject'
                        id='descriptionProject'
                        value={formik.values.descriptionProject}
                        onChange={formik.handleChange}
                        minRows={5}
                        maxRows={5}
                    />

                    <DialogActions>

                        {(companies.length > 0) && (
                            <SubmitButton type='submit'>
                                Agregar
                            </SubmitButton>
                        )}
                    </DialogActions>
                </Box>
                {(companies < 1) && (<Alert severity="error">Debe haber al menos una empresa cliente registrada</Alert>)}
                {(formik.errors.company) && (<Alert severity="error"> {formik.errors.company} </Alert>)}
            </DialogContent>

        </Dialog>
    )
}

export default AddProject;