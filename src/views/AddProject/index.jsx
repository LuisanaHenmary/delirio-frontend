import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Typography,
    Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCompaniesContext } from '../../hooks/useCompanyContext';
import { useProjectsContext } from '../../hooks/useProjectsContexr';
import { TextArea } from './styledTheme';




const AddProject = ({ open, handleClose }) => {

    const { user } = useAuthContext()
    const { companies } = useCompaniesContext()
    const { dispatchProjects } = useProjectsContext()

    const formik = useFormik({
        initialValues: {
            nameProject: '',
            descriptionProject: '',
            company: 0,

        },
        onSubmit: values => {
            sendInfo(values)
            handleClose()
        },
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
            <DialogTitle>Agregar Projecto </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        id="nameProject"
                        name='nameProject'
                        label="Nombre"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.nameProject}
                        required
                        sx={{ marginBottom: '40px', marginTop: '20px' }}
                        fullWidth
                    />

                    <Box component='div' className='margin-field section' >

                        {
                            companies.length > 0 && (
                                <Select
                                    value={formik.values.company}
                                    inputProps={{
                                        name: 'company',
                                        id: 'company',
                                    }}
                                    onChange={formik.handleChange}
                                >

                                    {companies.map((elem, index) => (
                                        <MenuItem key={index} value={index} >
                                            <Typography >{elem.name_company}</Typography>
                                        </MenuItem >
                                    ))}

                                </Select>
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
                            <Button variant="contained" type='submit' >
                                Agregar
                            </Button>
                        )}
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>
                </Box>
                {(companies < 1) && (<Alert severity="error">Debe haber al menos una empresa cliente registrada</Alert>)}
            </DialogContent>

        </Dialog>
    )
}

export default AddProject;