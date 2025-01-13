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
import { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useStatusContext } from '../../hooks/useStatusContext';
import { useToDoContext } from "../../hooks/useToDoContext";
import { useOpen } from "../../hooks/useOpen";
import { CustomStrong, DataTag } from "./styled";
import CloseIcon from '@mui/icons-material/Close';
import { SubmitButton, DelirioFullWidthSelectForm, InputFullDelerio } from "../styledComponents";
import { getToDoes } from "../../api";

const ToDoCardEmployer = ({ info, open, handleClose }) => {

    const { user } = useAuthContext()
    const { statues } = useStatusContext()
    const { dispatch } = useToDoContext()
    const [enable, changeToEnable, changeToDisabled] = useOpen()

    const formik = useFormik({
        initialValues: {
            id: 1,
            status: 0,
            copy_text: '',
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
            status,
            copy_text,
            content_todo
        } = values
        const apiUrl = import.meta.env.VITE_API_URL

        try {
            const response = await axios({
                method: 'put',
                url: `${apiUrl}/to-does/${id}`,
                data: {
                    'id_status': status,
                    'copy_text': copy_text,
                    'content_todo': content_todo,
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
        formik.setFieldValue('id', parseInt(info['id']))
        formik.setFieldValue('status', parseInt(info['id_status']))
        formik.setFieldValue('copy_text', info['copy_text'])
        formik.setFieldValue('content_todo', info['content_todo'])
        const now = new Date();

        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()


        const expiredDate = new Date(info.end);
        const currentDate = new Date(year, month, day)

        if (currentDate.getTime() >= expiredDate.getTime()) {
            changeToDisabled()
        } else {
            changeToEnable()
        }
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
                    <Typography variant='h4' component='h4' fontWeight='bold' color="white" >
                        {info['title']}
                    </Typography>

                    <div>
                        <DelirioFullWidthSelectForm
                            value={formik.values.status}
                            inputProps={{
                                name: 'status',
                                id: 'status',
                                disabled: !enable,
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

                    </div>


                </DialogTitle>

                <DialogContent sx={{ marginTop: "15px" }}  >

                    <Box component='div' className='margin-field section'>

                        <Typography component='h6'  >
                            <CustomStrong >
                                Fecha de asignación:
                            </CustomStrong>
                            <DataTag>
                                {info['assignment_date']}
                            </DataTag>
                        </Typography>

                        <Typography component='h6'  >
                            <CustomStrong >
                                Fecha limite:
                            </CustomStrong>
                            <DataTag>
                                {info['delivery_date']}
                            </DataTag>
                        </Typography>


                    </Box>

                    <Box component='div' className='margin-field section'>


                        <Typography component='h6' >
                            <CustomStrong >
                                Cliente:
                            </CustomStrong>
                            <DataTag>
                                {info['companyName']}
                            </DataTag>

                        </Typography>

                        <Typography component='h6' >
                            <CustomStrong >
                                Tipo:
                            </CustomStrong>
                            <DataTag>
                                {info['typeName']}
                            </DataTag>

                        </Typography>

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
                                Descripción:
                            </CustomStrong>
                            <DataTag>
                                {info['description_todo']}
                            </DataTag>
                        </Typography>

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

                </DialogContent>
                <DialogActions >
                    <SubmitButton type='submit'>
                        Aceptar
                    </SubmitButton>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default ToDoCardEmployer