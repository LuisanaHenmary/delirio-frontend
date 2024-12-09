import "./index.css"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
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
import { SubmitButton, DelirioSelectForm } from "../styledComponents";

const ToDoCardEmployer = ({ info, open, handleClose }) => {

    const { user } = useAuthContext()
    const { statues } = useStatusContext()
    const { todoes, dispatch } = useToDoContext()
    const [enable, changeToEnable, changeToDisabled] = useOpen()

    const formik = useFormik({
        initialValues: {
            id: 1,
            status: 0,
        },
        onSubmit: values => {
            updateInfo(values)
            handleClose()
        },
    });

    const updateInfo = async (values) => {

        const { id, status } = values
        const apiUrl = import.meta.env.VITE_API_URL

        await axios({
            method: 'put',
            url: `${apiUrl}/to-does/${id}`,
            data: {
                'id_status': status
            },
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const updatedList = todoes.map((x) => {
            return parseInt(x.data.id) == parseInt(id) ? ({

                ...x,
                data: {
                    ...x.data,
                    'id_status': status
                }
            }) : x
        })

        dispatch({ type: 'SET_TO_DOES', payload: updatedList })
    }

    const setInfo = async () => {
        formik.setFieldValue('id', parseInt(info['id']))
        formik.setFieldValue('status', parseInt(info['id_status']))

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
                        <DelirioSelectForm
                            value={formik.values.status}
                            inputProps={{
                                name: 'status',
                                id: 'status',
                                disabled: !enable
                            }}
                            className='select-status'
                            onChange={formik.handleChange}

                        >

                            {statues.map((elem, index) => (
                                <MenuItem key={index} value={parseInt(elem.id_status)} >
                                    <Typography className={`${elem.className} tag`}  >{elem.name_status}</Typography>
                                </MenuItem >
                            ))}
                        </DelirioSelectForm>
                        <IconButton onClick={() => handleClose()} >
                            <CloseIcon sx={{ color: "white" }} />
                        </IconButton>

                    </div>


                </DialogTitle>
                <DialogContent sx={{ marginTop: "15px" }}  >

                    <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Stack component='div' className='margin-field section' spacing={5}>

                            <Typography component='h6' >
                                <CustomStrong >
                                    Cliente:
                                </CustomStrong>
                                <DataTag>
                                    {info['companyName']}
                                </DataTag>

                            </Typography>

                            <Typography component='h6'  >
                                <CustomStrong >
                                    Proyecto:
                                </CustomStrong>
                                <DataTag>
                                    {info['projectName']}
                                </DataTag>
                            </Typography>

                        </Stack>

                        <Stack component='div' className='margin-field section' spacing={5}>

                            <Typography component='h6' >
                                <CustomStrong >
                                    Empleado:
                                </CustomStrong>
                                <DataTag>
                                    {info['employerName']}
                                </DataTag>

                            </Typography>

                            <Typography component='h6'  >
                                <CustomStrong >
                                    Fecha limite:
                                </CustomStrong>
                                <DataTag>
                                    {info['expired']}
                                </DataTag>
                            </Typography>

                        </Stack>
                    </Box>

                    <DialogActions sx={{ marginTop: "30px" }} >
                        <SubmitButton type='submit'>
                            Aceptar
                        </SubmitButton>
                    </DialogActions>

                </DialogContent>
            </Box>
        </Dialog>
    )
}

export default ToDoCardEmployer