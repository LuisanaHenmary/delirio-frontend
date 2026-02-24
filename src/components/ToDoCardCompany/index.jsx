import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import { CustomStrong, DataTag } from "./styled";
import CloseIcon from '@mui/icons-material/Close';
import { SocialMedios } from '../styledComponents';
import { useEffect } from 'react';
import { useFormik } from 'formik';

const ToDoCardCompany = ({ info, open, handleClose }) => {

    const formik = useFormik({
        initialValues: {
            by_instragram: false,
            by_facebook: false,
            by_tiktok: false
        },
        onSubmit: values => { },
    });

    const getStatus = () => {
        const checked_instragram = info['by_instragram'] === "1"
        const checked_facebook = info['by_facebook'] === "1"
        const checked_tiktok = info['by_tiktok'] === "1"

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
            <DialogTitle className='title-card' component="div">

                <Typography variant='h4' fontWeight='bold' color='white' >
                    {info['title']}
                </Typography>

                <div>
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

                </div>


            </DialogTitle>
            <DialogContent sx={{ height: "auto", margin: "20px" }} >

                <Box component='div' className='margin-field section'>

                    <Typography component='h6'  >
                        <CustomStrong >
                            Fecha de entrega:
                        </CustomStrong>
                        <DataTag>
                            {info['delivery_date']}
                        </DataTag>
                    </Typography>

                    <Typography component='h6'  >
                        <CustomStrong >
                            Tipo de tarea:
                        </CustomStrong>
                        <DataTag>
                            {info['typeName']}
                        </DataTag>
                    </Typography>

                </Box>

                <Box component='div' className='margin-field section'>

                    <Typography component='h6'  >
                        <CustomStrong >
                            Copy:
                        </CustomStrong>
                        <DataTag>
                            {info['copy_text']}
                        </DataTag>

                    </Typography>


                </Box>

                <Box component='div' className='margin-field section'>

                    <Typography component='h6'  >
                        <CustomStrong >
                            Contenido:
                        </CustomStrong>
                        <DataTag>
                            {info['content_todo']}
                        </DataTag>

                    </Typography>


                </Box>

                <Box component='div' className='margin-field section'>

                    <SocialMedios formik={formik} isDisable={true} />


                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default ToDoCardCompany