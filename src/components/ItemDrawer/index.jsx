import { Link as RouterLink } from "react-router-dom";
import {
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';

export const AdminOptions = ({changeToOpenAddProfile}) => {
    
    return (
        <>
            <ListItem disablePadding component={RouterLink} to="home" className="first" >
                <ListItemButton  >
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
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
            <ListItem disablePadding>
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
            <ListItem disablePadding component={RouterLink} to="home" className="first" >
                <ListItemButton  >
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton >
                    <ListItemText primary="Tareas" />
                </ListItemButton>
            </ListItem>

        </>
    )

}