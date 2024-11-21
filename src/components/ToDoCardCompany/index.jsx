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
            <DialogTitle>
                {info['title']}
            </DialogTitle>
            <DialogContent >

                <Box component="div">
                    <Box component='div' className='margin-field section' >

                        <Typography
                            className={`${info['statusClass']} tag-status`}
                            variant="h6"
                            component="span"
                        >
                            {info['statusName']}
                        </Typography>


                        <Typography component='h6'>
                            {info['companyName']}
                        </Typography>

                        <Typography component='h6'>
                            {info['employerName']}
                        </Typography>

                        <Typography component='h6'>
                            {info['expired']}
                        </Typography>
                    </Box>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>

                </Box>
            </DialogContent>

        </Dialog>
    )
}

export default ToDoCardCompany