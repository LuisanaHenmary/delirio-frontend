import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box
} from '@mui/material';

const ToDoCardCompany = ({ info, open, handleClose }) => {

    return (
        <Dialog onClose={() => handleClose()} open={open} PaperComponent='div' PaperProps={{
            'className': 'round-form'
        }} >
            <DialogTitle className='title-card'  component="div">

                <Typography variant='h4' fontWeight='bold' >
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
            <DialogContent >

                <Box component="div">
                    <Box component='div' className='margin-field section' >

                        <Typography component='h6'>
                            <strong >
                                Cliente:
                            </strong>
                            {info['companyName']}
                        </Typography>

                        <Typography component='h6'>
                            <strong >
                                Empleado:
                            </strong>
                            {info['employerName']}
                        </Typography>

                        <Typography component='h6'>
                            <strong  >
                                Fecha limite:
                            </strong>
                            {info['expired']}
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