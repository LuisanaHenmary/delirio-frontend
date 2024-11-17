import {
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import { Link as RouterLink } from "react-router-dom";

export const AdminOptions = ({ changeToOpenAddProfile }) => {

    return (
        <>
            <ListItem disablePadding >
                <ListItemButton  >
                    <ListItemText primary="Estadisticas" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
                <ListItemButton onClick={changeToOpenAddProfile} >
                    <ListItemText primary="Crear perfil" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding component={RouterLink} to="to-does" >
                <ListItemButton >
                    <ListItemText primary="Tareas" />
                </ListItemButton>
            </ListItem>

        </>
    )

}

export const EmployerOptions = () => {

    return (
        <>
            <ListItem disablePadding component={RouterLink} to="to-does">
                <ListItemButton >
                    <ListItemText primary="Tareas" />
                </ListItemButton>
            </ListItem>
        </>
    )

}