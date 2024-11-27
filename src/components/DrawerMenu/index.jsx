import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    ListItemIcon
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Link as RouterLink } from "react-router-dom";
import { AdminOptions, EmployerOptions } from '../ItemDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';
import { DelirioMenu } from './styled';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const DrawerMenu = ({ openMenu, changeToCloseMenu, handleClick, changeToOpenAddProfile }) => {
    const { user } = useAuthContext()

    return (
        <>{user && (
            <Drawer
                variant="persistent"
                anchor="left"
                open={openMenu}
                PaperProps={DelirioMenu}
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
                <List >
                    <Box>
                        <Navigate to="/home" />

                        <ListItem disablePadding component={RouterLink} to="home" className="first" >
                            <ListItemButton  >
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        {user.role == "admin" ? <AdminOptions changeToOpenAddProfile={changeToOpenAddProfile} /> : null}
                        {user.role == "employer" ? <EmployerOptions /> : null}
                    </Box>

                    <Box sx={{ marginTop: "100%" }} >

                        <ListItem disablePadding className="last"  >
                            <ListItemButton onClick={handleClick} >
                                <ListItemIcon>
                                    <PowerSettingsNewIcon sx={{color:"white"}} />
                                </ListItemIcon>
                                <ListItemText primary="Salir" />
                            </ListItemButton>

                        </ListItem>

                    </Box>

                </List>

            </Drawer >
        )}
        </>
    )
}

export default DrawerMenu