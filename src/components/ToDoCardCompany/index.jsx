import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box
} from '@mui/material';
import { CustomStrong, DataTag } from "./styled";

const ToDoCardCompany = ({ info, open, handleClose }) => {

    return (
        <Dialog onClose={() => handleClose()} open={open} PaperComponent='div' PaperProps={{
            'className': 'round-form'
        }} >
            <DialogTitle className='title-card' component="div">

                <Typography variant='h4' fontWeight='bold' color='white' >
                    {info['title']}
                </Typography>

                <Typography
                    className={`${info['statusClass']} tag-status`}
                    variant="h6"
                    component="span"
                >
                    {info['statusName']}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ marginTop: "15px" }} >

                <Box component="div">
                    <Box component='div' className='margin-field section' >

                        <Typography component='h6'  >
                            <CustomStrong >
                                Cliente:
                            </CustomStrong>
                            <DataTag>
                                {info['companyName']}
                            </DataTag>

                        </Typography>

                        <Typography component='h6'  >
                            <CustomStrong >
                                Empleado:
                            </CustomStrong>
                            <DataTag>
                                {info['employerName']}
                            </DataTag>

                        </Typography>

                    </Box>

                    <Box component='div' className='margin-field section' >

                        <Typography component='h6'  >
                            <CustomStrong >
                                Fecha limite:
                            </CustomStrong>
                            <DataTag>
                                {info['expired']}
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

                    </Box>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Cerrar</Button>
                    </DialogActions>

                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default ToDoCardCompany