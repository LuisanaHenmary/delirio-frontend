import {
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Typography,
    Box
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

const ToDoCardAdmin = ({ info, open, handleClose }) => {

    const { user } = useAuthContext()
    const { employers } = useEmployersContext()
    const { todoes, dispatch } = useToDoContext()


    const formik = useFormik({
        initialValues: {
            id: 1,
            title: '',
            expired: dayjs(),
            employer: 0
        },
        onSubmit: values => {
            updateInfo(values)
            handleClose()
        },
    });

    const updateInfo = async (values) => {

        const { id, title, employer, expired } = values
        const apiUrl = import.meta.env.VITE_API_URL

        const id_employer = employers[employer]['id_employer']

        await axios({
            method: 'put',
            url: `${apiUrl}/to-does/admin/${id}`,
            data: {
                id_employer,
                'title': title,
                'expired': expired.$d,

            },
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const dateExpired = new Date(expired.$d);
        const day = dateExpired.getDate()
        const month = dateExpired.getMonth() + 1
        const year = dateExpired.getFullYear()
        const formatDate = `${day}-${month}-${year}`;

        const updatedList = todoes.map((x) => {
            return parseInt(x.data.id) == parseInt(id) ? ({

                ...x,
                'title': title,
                'start': dateExpired,
                'end': dateExpired,
                data: {
                    ...x.data,
                    id_employer,
                    'title': title,
                    'expired': formatDate
                }
            }) : x
        })

        dispatch({ type: 'SET_TO_DOES', payload: updatedList })
    }

    const getStatus = () => {
        formik.setFieldValue('id', parseInt(info['id']))
        formik.setFieldValue('title', info['title'])
        formik.setFieldValue('expired', dayjs(info['expired']))
        formik.setFieldValue('employer', parseInt(info['employerIndex']))
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
            <DialogContent >

                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        name='title'
                        value={formik.values.title}
                        variant="standard"
                        onChange={formik.handleChange}
                        fullWidth
                        sx={{ marginBottom: '20px' }}
                    />
                    <Box component='div' className='margin-field section' >

                        <Typography
                            className={`${info['statusClass']} tag-status`}
                            variant="h6"
                            component="span"
                        >
                            {info['statusName']}
                        </Typography>


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
                        <Button variant="contained" type='submit'>
                            Agregar
                        </Button>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>

                </Box>


            </DialogContent>

        </Dialog>
    )
}

export default ToDoCardAdmin
