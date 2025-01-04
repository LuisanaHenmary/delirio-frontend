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
import { useToDoTypeContext } from '../../hooks/useToDoTypeContext';
import { useToDoContext } from '../../hooks/useToDoContext';
import { useState, useEffect } from 'react';
import { SubmitButton, DelirioSelectForm, InputFullDelerio, SocialMedios, TextArea } from '../../components/styledComponents';
import CloseIcon from '@mui/icons-material/Close';
import { ToDoValidation } from '../../Validations/ToDoValidation';
import { getToDoes } from '../../api';


const AddToDo = ({ open, handleClose }) => {

    const { user } = useAuthContext()
    const { employers } = useEmployersContext()
    const { companies } = useCompaniesContext()
    const { to_do_types } = useToDoTypeContext()
    const { dispatch } = useToDoContext()

    const [avalibleSubmit, setAvalibleSubmit] = useState(true)

    const formik = useFormik({
        initialValues: {
            titleTodo: '',
            delivery_date: dayjs(),
            assignment_date: dayjs(),
            to_do_type: '',
            employer: '',
            company: '',
            by_instragram: true,
            by_facebook: false,
            by_tiktok: false,
            description_todo: '',
            copy_text: '',
            material_link: ''

        },
        onSubmit: values => {
            sendInfo(values)
            handleClose()
        },
        validationSchema: ToDoValidation
    });

    const sendInfo = async (values) => {

        const apiUrl = import.meta.env.VITE_API_URL

        const {
            titleTodo,
            to_do_type,
            employer,
            company,
            assignment_date,
            delivery_date,
            by_instragram,
            by_facebook,
            by_tiktok,
            description_todo,
            copy_text,
            material_link,
        } = values

        const id1 = parseInt(employers[employer]['id_employer'])
        const id2 = parseInt(companies[company]['id_company'])
        const id3 = parseInt(to_do_types[to_do_type]['id_type'])

        try {
            const response = await axios({
                method: 'post',
                url: `${apiUrl}/to-does`,
                data: {
                    'title': titleTodo,
                    'id_employer': id1,
                    'id_company': id2,
                    'id_type': id3,
                    'by_instragram': by_instragram,
                    'by_facebook': by_facebook,
                    'by_tiktok': by_tiktok,
                    'assignment_date': assignment_date.$d,
                    'delivery_date': delivery_date.$d,
                    'description_todo': description_todo,
                    'content_todo': '',
                    'material_link': material_link,
                    'copy_text': copy_text
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.status === 200) {
                getToDoes(user, dispatch)
            }
        } catch (e) {
            console.log(e)
        }
        finally {
            formik.resetForm()
        }

    }

    useEffect(() => {

        if (formik.errors.company || formik.errors.employer || formik.errors.to_do_type) {
            setAvalibleSubmit(true)
        } else {

            setAvalibleSubmit(false)

        }

    }, [formik.errors, formik.values])


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

                    <DelirioSelectForm
                        value={formik.values.to_do_type}
                        inputProps={{
                            name: 'to_do_type',
                            id: 'to_do_type',
                        }}
                        onChange={formik.handleChange}
                        displayEmpty
                    >
                        <MenuItem value='' >
                            <em>Tipo de tarea</em>
                        </MenuItem >

                        {to_do_types.map((elem, index) => (
                            <MenuItem key={index} value={index} >
                                <Typography >{elem.name_type}</Typography>
                            </MenuItem >
                        ))}

                    </DelirioSelectForm>

                    <IconButton onClick={() => handleClose()} >
                        <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ height: "550px" }} >



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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="assignment_date"
                                label="Fecha de asignacion"
                                value={formik.values.assignment_date}
                                onChange={(value) => formik.setFieldValue('assignment_date', value)}
                                slotProps={{ textField: { sx: { width: "250px" } } }}
                                sx={{ marginBottom: '20px' }}
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="delivery_date"
                                label="Fecha de entrega"
                                value={formik.values.delivery_date}
                                onChange={(value) => formik.setFieldValue('delivery_date', value)}
                                slotProps={{ textField: { sx: { width: "250px" } } }}
                                sx={{ marginBottom: '20px' }}
                            />
                        </LocalizationProvider>

                    </Box>

                    <Box component='div' className='margin-field section' >

                        <SocialMedios formik={formik} />

                    </Box>

                    <Box component='div' className='margin-field section' >

                        <InputFullDelerio
                            id="copy_text"
                            name='copy_text'
                            placeholder='Copy'
                            onChange={formik.handleChange}
                            value={formik.values.copy_text}
                            inputProps={{
                                style: {
                                    background: "none",
                                    border: 0,
                                    color: "white",
                                    borderRadius: "20px",
                                }
                            }}
                            fullWidth
                        />

                    </Box>

                    <Box component='div' className='margin-field section' >

                        <InputFullDelerio
                            id="material_link"
                            name='material_link'
                            placeholder='Link del material'
                            onChange={formik.handleChange}
                            value={formik.values.material_link}
                            inputProps={{
                                style: {
                                    background: "none",
                                    border: 0,
                                    color: "white",
                                    borderRadius: "20px",
                                }
                            }}
                            fullWidth
                        />

                    </Box>

                    <Box component='div' className='margin-field section' >

                        <TextArea
                            name='description_todo'
                            id='description_todo'
                            placeholder='Descripción de la tarea'
                            value={formik.values.description_todo}
                            onChange={formik.handleChange}
                            minRows={5}
                            maxRows={5}
                            required
                        />

                    </Box>

                </DialogContent>

                <DialogActions>
                    <SubmitButton type='submit' disabled={avalibleSubmit} >
                        Agregar
                    </SubmitButton>
                </DialogActions>

            </Box>



            {(formik.errors.employer) && (<Alert severity="error"> {formik.errors.employer} </Alert>)}
            {(formik.errors.company) && (<Alert severity="error"> {formik.errors.company} </Alert>)}
            {(formik.errors.to_do_type) && (<Alert severity="error"> {formik.errors.to_do_type} </Alert>)}
            {(employers < 1) && (<Alert severity="error">Debe haber al menos un empleado registrado</Alert>)}
            {(companies < 1) && (<Alert severity="error">Debe haber al menos una empresa cliente registrada</Alert>)}


        </Dialog >
    )
}

export default AddToDo;