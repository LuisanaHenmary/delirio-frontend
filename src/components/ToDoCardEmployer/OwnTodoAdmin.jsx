import "./index.css"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Typography,
    Box,
    Stack,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useStatusContext } from '../../hooks/useStatusContext';
import { useToDoContext } from "../../hooks/useToDoContext";
import { CustomStrong, DataTag } from "./styled";
import dayjs from 'dayjs';
import { getToDoes } from "../../api";
import { useEmployersContext } from '../../hooks/useEmployersContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    SubmitButton,
    DelirioFullWidthSelectForm,
    InputFullDelerio,
    DelirioSelectForm,
    SocialMedios,
    TextArea
} from "../styledComponents";

const ToDoCardOwnAdmin = ({ info, open, handleClose }) => {

    const { user } = useAuthContext()
    const { statues } = useStatusContext()
    const { dispatch } = useToDoContext()
    const { employers } = useEmployersContext()


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
            by_tiktok: false,
            status: 1,
            content_todo: '',
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
            delivery_date,
            assignment_date,
            employer,
            description_todo,
            material_link,
            copy_text,
            by_instragram,
            by_facebook,
            by_tiktok,
            status,
            content_todo
        } = values
        const apiUrl = import.meta.env.VITE_API_URL

        const id_employer = employers[employer]['id_employer']

        try {
            const response = await axios({
                method: 'put',
                url: `${apiUrl}/to-does/admin/own/${id}`,
                data: {
                    title,
                    id_employer,
                    material_link,
                    description_todo,
                    by_instragram,
                    by_facebook,
                    by_tiktok,
                    copy_text,
                    content_todo,
                    'assignment_date': assignment_date.$d,
                    'delivery_date': delivery_date.$d,
                    'id_status': status

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

    const setInfo = async () => {
        const checked_instragram = info['by_instragram'] === "1"
        const checked_facebook = info['by_facebook'] === "1"
        const checked_tiktok = info['by_tiktok'] === "1"
        formik.setFieldValue('id', parseInt(info['id']))
        formik.setFieldValue('title', info['title'])
        formik.setFieldValue('delivery_date', dayjs(info['delivery_date']))
        formik.setFieldValue('assignment_date', dayjs(info['assignment']))
        formik.setFieldValue('status', parseInt(info['id_status']))
        formik.setFieldValue('copy_text', info['copy_text'])
        formik.setFieldValue('content_todo', info['content_todo'])
        formik.setFieldValue('by_instragram', checked_instragram)
        formik.setFieldValue('by_facebook', checked_facebook)
        formik.setFieldValue('by_tiktok', checked_tiktok)
        formik.setFieldValue('employer', parseInt(info['employerIndex']))
        formik.setFieldValue('description_todo', info['description_todo'])
        formik.setFieldValue('material_link', info['material_link'])

    }

    useEffect(() => {

        try {
            setInfo()

        } catch (e) {
            console.log(e)
        }

    }, [info])

    return (
        <Dialog onClose={() => handleClose()} open={open} PaperComponent='div' PaperProps={{
            'className': 'round-form'
        }} >
            <Box component="form" onSubmit={formik.handleSubmit}>
                <DialogTitle component='div' className="title-card" >
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
                        <DelirioFullWidthSelectForm
                            value={formik.values.status}
                            inputProps={{
                                name: 'status',
                                id: 'status',
                            }}
                            className='select-status'
                            onChange={formik.handleChange}
                        >

                            {statues.map((elem, index) => (
                                <MenuItem key={index} value={parseInt(elem.id_status)} >
                                    <Typography className={`${elem.className} tag`}  >{elem.name_status}</Typography>
                                </MenuItem >
                            ))}
                        </DelirioFullWidthSelectForm>
                        <IconButton onClick={() => handleClose()} >
                            <CloseIcon sx={{ color: "white" }} />
                        </IconButton>

                    </>

                </DialogTitle>

                <DialogContent sx={{ marginTop: "15px" }}  >

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
                        <InputFullDelerio
                            id="copy_text"
                            name='copy_text'
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
                            id="content_todo"
                            name='content_todo'
                            onChange={formik.handleChange}
                            value={formik.values.content_todo}
                            placeholder="Contenido"
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

                    <Box component='div' className='margin-field section'>

                        <Typography component='h6'  >
                            <CustomStrong >
                                Material:
                            </CustomStrong>
                            <DataTag>
                                {info['material_link']}
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

export default ToDoCardOwnAdmin