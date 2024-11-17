import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate } from "react-router-dom";
import { AdminOptions, EmployerOptions } from '../ItemDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';

const DrawerMenu = ({openMenu, changeToCloseMenu, handleClick, changeToOpenAddProfile}) =>{
    const { user } = useAuthContext()

    return(
        <Drawer
                variant="persistent"
                anchor="left"
                open={openMenu}
                PaperProps={{
                    sx: {
                        backgroundColor: "black",
                        color: 'white',
                        padding: '10px'
                    }
                }}
                className="menuCustom"
            >
                <div>
                    <IconButton onClick={changeToCloseMenu} sx={{
                        backgroundColor: 'white', ":hover": {
                            backgroundColor: 'rgba(228, 230, 232, 0.683)'
                        }
                    }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List >

                    {!user && (
                        <>
                            <ListItem disablePadding component='a' href="http://localhost/Delirio" >
                                <ListItemButton>
                                    <ListItemText primary="Wordpress" />
                                </ListItemButton>
                            </ListItem>

                            <Navigate to="/login" />
                        </>
                    )}
                    {user && (
                        <>
                            <Navigate to="/home" />

                            {user.role == "admin" ? <AdminOptions changeToOpenAddProfile={changeToOpenAddProfile} /> : null}
                            {user.role == "employer" ? <EmployerOptions /> : null}
                            <ListItem disablePadding className="last" >
                                <ListItemButton onClick={handleClick}>
                                    <ListItemText primary="Log Out" />
                                </ListItemButton>
                            </ListItem>

                        </>
                    )}
                </List>

            </Drawer >
    )
}

export default DrawerMenu