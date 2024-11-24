import { useState } from 'react';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Tab,
    Tabs
} from '@mui/material';
import AddEmployer from '../AddEmployer';
import AddCompany from '../AddCompany';

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

    const closeWindow = () =>{
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
            <DialogTitle>Nuevo perfil </DialogTitle>
            <DialogContent>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Empleado" />
                        <Tab label="Empresa cliente" />
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