import axios from 'axios';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Typography,
    Alert,
    IconButton
} from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEmployersContext } from '../../hooks/useEmployersContext';
import { useCompaniesContext } from '../../hooks/useCompanyContext';
import { useProjectsContext } from '../../hooks/useProjectsContexr';
import { useToDoContext } from '../../hooks/useToDoContext';
import { useEffect, useState } from 'react';
import { SubmitButton, DelirioSelectForm, InputFullDelerio } from '../../components/styledComponents';
import CloseIcon from '@mui/icons-material/Close';
import { ToDoValidation } from '../../Validations/ToDoValidation';

const AddToDo = ({ open, handleClose }) => {

    const { user } = useAuthContext()
    const { employers } = useEmployersContext()
    const { companies } = useCompaniesContext()
    const { projects } = useProjectsContext()
    const { dispatch } = useToDoContext()
    const [avalibleProjects, setAvalibleProjects] = useState([])
    const [avalibleSubmit, setAvalibleSubmit] = useState(false)

    const formik = useFormik({
        initialValues: {
            titleTodo: '',
            expired: dayjs(),
            employer: '',
            company: '',
            project: ''
        },
        onSubmit: values => {
            sendInfo(values)
            handleClose()
        },
        validationSchema: ToDoValidation
    });

    const sendInfo = async (values) => {

        const apiUrl = import.meta.env.VITE_API_URL

        const { titleTodo, expired, employer, company, project } = values

        const id1 = parseInt(employers[employer]['id_employer'])
        const id2 = parseInt(companies[company]['id_company'])
        const id3 = parseInt(projects[project]['id_project'])

        const response = await axios({
            method: 'post',
            url: `${apiUrl}/to-does`,
            data: {
                'title': titleTodo,
                'expired': expired.$d,
                'id_employer': id1,
                'id_company': id2,
                'id_project': id3
            },
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const data = response.data['to-do']
        const id_todo = response.data['id']
        const dateExpired = new Date(expired.$d);
        const day = dateExpired.getDate()
        const month = dateExpired.getMonth() + 1
        const year = dateExpired.getFullYear()
        const formatDate = `${day}-${month}-${year}`;

        const new_to_do = {
            'title': titleTodo,
            'start': dateExpired,
            'end': dateExpired,
            'data': {
                ...data,
                'id': id_todo,
                'expired': formatDate


            }
        }

        dispatch({ type: 'CREATE_TO_DO', payload: new_to_do })
        formik.resetForm()
    }

    useEffect(() => {

        if ((formik.errors.company)) {
            setAvalibleSubmit(false)
        } else {

            const index = formik.values.company

            if (index !== "") {
                const projects_list = projects.filter((value) => {
                    return parseInt(value.id_company) == parseInt(companies[index].id_company)
                })

                setAvalibleProjects(projects_list)

                if ((projects_list.length > 0) && (employers.length > 0) && (companies.length > 0)) {
                    setAvalibleSubmit(true)
                } 
                else if((formik.errors.company)){
                    setAvalibleProjects([])
                    setAvalibleSubmit(false)
                }
                else {
                    setAvalibleSubmit(false)
                }
            }

        }





    }, [projects, formik.errors, formik.values])

    return (
        <Dialog
            onClose={() => handleClose()}
            open={open} PaperComponent='div'
            PaperProps={{
                'className': 'round-form'
            }}
        >
            <Box component="form" onSubmit={formik.handleSubmit}>
            <DialogTitle component='div' className="title-card">
                <InputFullDelerio
                    id="titleTodo"
                    name='titleTodo'
                    placeholder='Titulo de la nueva tarea'
                    onChange={formik.handleChange}
                    value={formik.values.titleTodo}
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

                <IconButton onClick={() => handleClose()} >
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                


                    <Box component='div' className='margin-field section' >

                        {
                            employers.length > 0 && (

                                <DelirioSelectForm
                                    value={formik.values.employer}
                                    inputProps={{
                                        name: 'employer',
                                        id: 'employer',
                                    }}
                                    onChange={formik.handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value='' >
                                        <em>Empleado</em>
                                    </MenuItem >

                                    {employers.map((elem, index) => (
                                        <MenuItem key={index} value={index} >
                                            <Typography >{elem.name_employer}</Typography>
                                        </MenuItem >
                                    ))}

                                </DelirioSelectForm>
                            )
                        }

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

                                </DelirioSelectForm>)
                        }

                    </Box>

                    <Box component='div' className='margin-field section' >

                        {
                            avalibleProjects.length > 0 && (

                                <DelirioSelectForm
                                    value={formik.values.project}
                                    inputProps={{
                                        name: 'project',
                                        id: 'project',
                                    }}
                                    onChange={formik.handleChange}
                                    displayEmpty
                                >
                                    <MenuItem value='' >
                                        <em>Proyecto</em>
                                    </MenuItem >

                                    {avalibleProjects.map((elem, index) => (
                                        <MenuItem key={index} value={index} >
                                            <Typography >{elem.name_project}</Typography>
                                        </MenuItem >
                                    ))}

                                </DelirioSelectForm>

                            )
                        }

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="expired"
                                label="Fecha Limite"
                                value={formik.values.expired}
                                onChange={(value) => formik.setFieldValue('expired', value)}
                                slotProps={{ textField: { sx: { width: "250px" } } }}
                                sx={{ marginBottom: '20px' }}
                            />
                        </LocalizationProvider>

                    </Box>




                    <DialogActions>
                        {avalibleSubmit && (<SubmitButton type='submit' >
                            Agregar
                        </SubmitButton>)}
                    </DialogActions>
                
                {(formik.errors.employer) && (<Alert severity="error"> {formik.errors.employer} </Alert>)}
                {(formik.errors.company) && (<Alert severity="error"> {formik.errors.company} </Alert>)}
                {(formik.errors.project) && (<Alert severity="error"> {formik.errors.project}</Alert>)}
                {(employers < 1) && (<Alert severity="error">Debe haber al menos un empleado registrado</Alert>)}
                {(companies < 1) && (<Alert severity="error">Debe haber al menos una empresa cliente registrada</Alert>)}
            </DialogContent>
            </Box>

        </Dialog>
    )
}

export default AddToDo;