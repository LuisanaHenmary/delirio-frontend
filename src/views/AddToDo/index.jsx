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
    Alert
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

const AddToDo = ({ open, handleClose }) => {

    const { user } = useAuthContext()
    const { employers } = useEmployersContext()
    const { companies } = useCompaniesContext()
    const { projects } = useProjectsContext()
    const { dispatch } = useToDoContext()
    const [avalibleProjects, setAvalibleProjects] = useState([])
    const [avalibleSubmit, setAvalibleSubmit] = useState(true)

    const formik = useFormik({
        initialValues: {
            titleTodo: '',
            expired: dayjs(),
            employer: 0,
            company: 0,
            project: 0
        },
        onSubmit: values => {
            sendInfo(values)
            handleClose()
        },
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

        const new_to_do = {
            'title': titleTodo,
            'start': expired.$d,
            'end': expired.$d,
            'data': data
        }

        dispatch({ type: 'CREATE_TO_DO', payload: new_to_do })
        formik.resetForm()
    }

    useEffect(() => {

        const index = formik.values.company

        const projects_list = projects.filter((value) => {
            return parseInt(value.id_company) == parseInt(companies[index].id_company)
        })

        setAvalibleProjects(projects_list)

        if ((projects_list.length > 0) && (employers.length > 0) && (companies.length > 0)) {
            setAvalibleSubmit(true)
        } else {
            setAvalibleSubmit(false)
        }



    }, [projects, formik.values.company])

    return (
        <Dialog
            onClose={() => handleClose()}
            open={open} PaperComponent='div'
            PaperProps={{
                'className': 'round-form'
            }}
        >
            <DialogTitle>Agregar To-do </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        id="titleTodo"
                        name='titleTodo'
                        label="Titulo"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.titleTodo}
                        required
                        sx={{ marginBottom: '40px', marginTop: '20px' }}
                        fullWidth
                    />

                    <Box component='div' className='margin-field section' >

                        {
                            employers.length > 0 && (
                                <Select
                                    value={formik.values.employer}
                                    inputProps={{
                                        name: 'employer',
                                        id: 'employer',
                                    }}
                                    onChange={formik.handleChange}
                                >

                                    {employers.map((elem, index) => (
                                        <MenuItem key={index} value={index} >
                                            <Typography >{elem.name_employer}</Typography>
                                        </MenuItem >
                                    ))}

                                </Select>
                            )
                        }

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

                                </Select>)
                        }

                        {
                            avalibleProjects.length > 0 && (
                                <Select
                                    value={formik.values.project}
                                    inputProps={{
                                        name: 'project',
                                        id: 'project',
                                    }}
                                    onChange={formik.handleChange}
                                >

                                    {avalibleProjects.map((elem, index) => (
                                        <MenuItem key={index} value={index} >
                                            <Typography >{elem.name_project}</Typography>
                                        </MenuItem >
                                    ))}

                                </Select>
                            )
                        }

                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            name="expired"
                            value={formik.values.expired}
                            onChange={(value) => formik.setFieldValue('expired', value)}
                            slotProps={{ textField: { fullWidth: true } }}
                            sx={{ marginBottom: '20px' }}
                        />
                    </LocalizationProvider>


                    <DialogActions>

                        {avalibleSubmit && <Button variant="contained" type='submit' >
                            Agregar
                        </Button>}
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>
                </Box>
                {(avalibleProjects < 1) && (<Alert severity="error">La compañia debe tener al menos un projecto</Alert>)}
                {(employers < 1) && (<Alert severity="error">Debe haber al menos un empleado registrado</Alert>)}
                {(companies < 1) && (<Alert severity="error">Debe haber al menos una empresa cliente registrada</Alert>)}
            </DialogContent>

        </Dialog>
    )
}

export default AddToDo;