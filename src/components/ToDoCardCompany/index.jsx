import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    IconButton,
    Stack
} from '@mui/material';
import { CustomStrong, DataTag } from "./styled";
import CloseIcon from '@mui/icons-material/Close';

const ToDoCardCompany = ({ info, open, handleClose }) => {

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
            <DialogContent sx={{ height: "150px",margin:"20px" }} >

                <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Stack component='div' className='margin-field section' spacing={5} >

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

                    </Stack>

                    <Stack component='div' className='margin-field section' spacing={5} >

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
            </DialogContent>

        </Dialog>
    )
}

export default ToDoCardCompany