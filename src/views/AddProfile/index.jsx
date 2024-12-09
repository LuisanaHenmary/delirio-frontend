import { useState } from 'react';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Tab,
    Tabs,
    Typography,
    IconButton
} from '@mui/material';
import AddEmployer from '../AddEmployer';
import AddCompany from '../AddCompany';
import CloseIcon from '@mui/icons-material/Close';

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            component='div'
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box >{children}</Box>}
        </Box>
    );
}


const AddProfile = ({ open, handleClose }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const closeWindow = () => {
        handleClose()
        handleChange(null, 0)
    }

    return (
        <Dialog
            onClose={() => closeWindow()}
            open={open}
            PaperComponent='div' PaperProps={{
                'className': 'round-form'
            }}
        >
            <DialogTitle component='div' className="title-card" >
                <Typography variant='h4' component='h4' fontWeight='bold' color="white" >
                    Nuevo perfil
                </Typography>
                <IconButton onClick={() => handleClose()} >
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Empleado" sx={{textTransform:"capitalize", fontWeight:"bolder"}} />
                        <Tab label="Empresa cliente" sx={{textTransform:"capitalize", fontWeight:"bolder"}} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <AddEmployer handleClose={closeWindow} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <AddCompany handleClose={closeWindow} />
                </CustomTabPanel>
            </DialogContent>

        </Dialog>
    )
}

export default AddProfile;