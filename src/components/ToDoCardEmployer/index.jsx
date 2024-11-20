import "./index.css"
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    Typography,
    Box
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useStatusContext } from '../../hooks/useStatusContext';
import { useToDoContext } from "../../hooks/useToDoContext";

const ToDoCardEmployer = ({ info, open, handleClose }) => {

    const { user } = useAuthContext()
    const { statues } = useStatusContext()
    const { todoes ,dispatch } = useToDoContext()

    const formik = useFormik({
        initialValues: {
            id: 1,
            status: '',
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

        const updatedList = todoes.map((x)=>{
            return parseInt(x.data.id) == parseInt(id)?({

                ...x,
                data: {
                    ...x.data,
                    'id_status':status
                }
            }):x
        })

        dispatch({ type: 'SET_TO_DOES', payload: updatedList })
    }

    const setInfo = async () => {
        formik.setFieldValue('id', parseInt(info['id']))
        formik.setFieldValue('status', parseInt(info['id_status']))
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
            <DialogTitle>
                {info['title']}
            </DialogTitle>
            <DialogContent >

                <Box component="form" onSubmit={formik.handleSubmit}>
                    <Box component='div' className='margin-field section' >

                        <Select
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
                        </Select>


                        <Typography component='h6'>
                            {info['companyName']}
                        </Typography>

                        <Typography component='h6'>
                            {info['expired']}
                        </Typography>
                    </Box>
                    <DialogActions>
                        <Button variant="contained" type='submit'>
                            Aceptar
                        </Button>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>

                </Box>


            </DialogContent>

        </Dialog>
    )
}

export default ToDoCardEmployer

/** */