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
import { Navigate, useLocation, Link as RouterLink } from "react-router-dom";
import { AdminOptions, EmployerOptions, ItemDrawer, SelectedIcon } from '../ItemDrawer';
import { useAuthContext } from '../../hooks/useAuthContext';
import { DelirioMenu, TypographyMenu } from './styled';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import WhiteDeer from "../../assets/whiteDeer.svg"

const DrawerMenu = ({ openMenu, changeToCloseMenu, handleClick, changeToOpenAddProfile }) => {
    const { user } = useAuthContext()
    const location = useLocation();
    const roles = {"admin":"Administrador", "employer":"Empleado", "company":"Cliente"}

    return (
        <>{user && (
            <Drawer
                variant="persistent"
                anchor="left"
                open={openMenu}
                PaperProps={DelirioMenu}
                className="menuCustom"
            >
                <div style={{ display: "flex" }} >
                    <div>
                        <IconButton onClick={changeToCloseMenu} sx={{
                            backgroundColor: 'white', ":hover": {
                                backgroundColor: 'rgba(228, 230, 232, 0.683)'
                            }
                        }}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <div style={{marginLeft:"10px", marginTop:"3px"}}>
                        <img src={WhiteDeer} alt='d' width={"40px"} height={"40px"} />
                        <TypographyMenu >
                            {roles[user.role]}
                        </TypographyMenu>
                    </div>
                </div>
                <List >
                    <Box>
                        {user.role == "admin" ?
                            <AdminOptions
                                changeToOpenAddProfile={changeToOpenAddProfile}
                                location={location}
                            /> :
                            null
                        }
                        {user.role == "employer" ? <EmployerOptions location={location} /> : null}
                    </Box>

                    <Box sx={{ marginTop: "100%" }} >

                        <ListItem disablePadding className="last"  >
                            <ListItemButton onClick={handleClick} >
                                <ListItemIcon>
                                    <PowerSettingsNewIcon sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Salir" sx={{ color: "white" }} />
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