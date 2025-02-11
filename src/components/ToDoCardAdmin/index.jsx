import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    MenuItem,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useFormik } from 'formik';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEmployersContext } from '../../hooks/useEmployersContext';
import { useToDoContext } from '../../hooks/useToDoContext';
import "./index.css"
import { CustomStrong, DataTag } from './styled';
import { SubmitButton, InputFullDelerio, DelirioSelectForm, SocialMedios, TextArea } from '../styledComponents';
import CloseIcon from '@mui/icons-material/Close';
import { getToDoes } from '../../api';

const ToDoCardAdmin = ({ info, open, handleClose }) => {

    const { user } = useAuthContext()
    const { employers } = useEmployersContext()
    const { todoes, dispatch } = useToDoContext()


    const formik = useFormik({
        initialValues: {
            id: 1,
            title: '',
            delivery_date: dayjs(),
            assignment_date: dayjs(),
            employer: '',
            description_todo: '',
            material_link: '',
            copy_text: '',
            by_instragram: false,
            by_facebook: false,
            by_tiktok: false
        },
        onSubmit: values => {
            updateInfo(values)
            handleClose()
        },
    });

    const updateInfo = async (values) => {

        const {
            id,
            title,
            employer,
            delivery_date,
            assignment_date,
            description_todo,
            material_link,
            copy_text,
            by_instragram,
            by_facebook,
            by_tiktok,
        } = values

        const apiUrl = import.meta.env.VITE_API_URL

        const id_employer = employers[employer]['id_employer']

        try {
            const response = await axios({
                method: 'put',
                url: `${apiUrl}/to-does/admin/${id}`,
                data: {
                    id_employer,
                    title,
                    description_todo,
                    material_link,
                    copy_text,
                    by_instragram,
                    by_facebook,
                    by_tiktok,
                    'assignment_date': assignment_date.$d,
                    'delivery_date': delivery_date.$d,

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

    }

    const getStatus = () => {

        const checked_instragram = info['by_instragram'] === "1"
        const checked_facebook = info['by_facebook'] === "1"
        const checked_tiktok = info['by_tiktok'] === "1"

        formik.setFieldValue('id', parseInt(info['id']))
        formik.setFieldValue('title', info['title'])
        formik.setFieldValue('delivery_date', dayjs(info['delivery_date']))
        formik.setFieldValue('assignment_date', dayjs(info['assignment']))
        formik.setFieldValue('employer', parseInt(info['employerIndex']))
        formik.setFieldValue('description_todo', info['description_todo'])
        formik.setFieldValue('material_link', info['material_link'])
        formik.setFieldValue('copy_text', info['copy_text'])
        formik.setFieldValue('by_instragram', checked_instragram)
        formik.setFieldValue('by_facebook', checked_facebook)
        formik.setFieldValue('by_tiktok', checked_tiktok)
    }

    useEffect(() => {
        try {
            getStatus()

        } catch (e) {
            console.log(e)
        }

    }, [info])

    return (
        <Dialog onClose={() => handleClose()} open={open} PaperComponent='div' PaperProps={{
            'className': 'round-form'
        }} >

            <Box component="form" onSubmit={formik.handleSubmit}>

                <DialogTitle component="div" className='title-card' >
                    <InputFullDelerio
                        id="title"
                        name='title'
                        onChange={formik.handleChange}
                        value={formik.values.title}
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

                    <>
                        <Typography
                            className={`${info['statusClass']} tag-status`}
                            variant="h6"
                            component="span"
                            marginRight={"5px"}
                        >
                            {info['statusName']}
                        </Typography>

                        <IconButton onClick={() => handleClose()} >
                            <CloseIcon sx={{ color: "white" }} />
                        </IconButton>
                    </>


                </DialogTitle>

                <DialogContent sx={{ marginTop: "15px" }} >

                    <Box component='div' className='margin-field section' >

                        <Typography component='h6'  >
                            <CustomStrong >
                                Tipo de tarea:
                            </CustomStrong>
                            <DataTag>
                                {info['typeName']}
                            </DataTag>

                        </Typography>

                    </Box>

                    <Box component='div' className='margin-field section' >

                        <Typography component='h6'  >
                            <CustomStrong >
                                Cliente:
                            </CustomStrong>
                            <DataTag>
                                {info['companyName']}
                            </DataTag>

                        </Typography>



                        <DelirioSelectForm
                            labelId='employer'
                            value={formik.values.employer}
                            inputProps={{
                                name: 'employer',
                                id: 'employer',
                            }}
                            onChange={formik.handleChange}
                            label="Empleado"
                        >
                            {employers.map((elem, index) => (
                                <MenuItem key={index} value={index} >
                                    {elem.name_employer}
                                </MenuItem >
                            ))}
                        </DelirioSelectForm>


                    </Box>

                    <Box component='div' className='margin-field section' >

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                name="assignment_date"
                                label="Fecha de asignación"
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

                        <Typography component='h6'  >
                            <CustomStrong >
                                Copy:
                            </CustomStrong>
                            <DataTag>
                                {info['copy_text']}
                            </DataTag>

                        </Typography>

                    </Box>

                    <Box component='div' className='margin-field section' >

                        <TextArea
                            name='description_todo'
                            id='description_todo'
                            value={formik.values.description_todo}
                            onChange={formik.handleChange}
                            minRows={3}
                            maxRows={3}
                            required
                        />

                    </Box>


                </DialogContent>

                <DialogActions>
                    <SubmitButton type='submit'>
                        Guardar
                    </SubmitButton>
                </DialogActions>
            </Box>

        </Dialog>
    )
}

export default ToDoCardAdmin
