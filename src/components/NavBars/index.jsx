import {
    Toolbar,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { useOpen } from '../../hooks/useOpen';
import "./index.css"

import { useLogout, useClear } from "../../hooks/useLogout"
import DrawerMenu from '../DrawerMenu';
import AddProfile from "../../views/AddProfile";

import { HideOnScroll } from '../HideOnScroll';


const NavBar = ({ children, username }) => {
    const { logout } = useLogout()
    const { clearLists } = useClear()
    const [openMenu, changeToOpenMenu, changeToCloseMenu] = useOpen()
    const [addProfile, changeToOpenAddProfile, changeToCloseAddProfile] = useOpen()

    const handleClick = () => {
        changeToCloseMenu()
        logout();
        clearLists()
    }

    return (
        <>
            <Box component="div" marginBottom={"100px"} >
                <DrawerMenu
                    openMenu={openMenu}
                    changeToCloseMenu={changeToCloseMenu}
                    handleClick={handleClick}
                    changeToOpenAddProfile={changeToOpenAddProfile}
                />


                <HideOnScroll>
                    <MuiAppBar sx={{ backgroundColor: "rgba(255, 255, 255, 0);", boxShadow: 0 }} >
                        <Toolbar>
                            <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'blue' }} component="div">
                                Delirio
                            </Typography>

                            <div>
                                <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'black', paddingRight: "5px" }} component="span">
                                    Hola, {username}
                                </Typography>
                                <IconButton

                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={changeToOpenMenu}
                                    sx={{ color: 'white', padding: '10px', background: "linear-gradient(#3DA2DB, #006096)" }}
                                >
                                    <SensorOccupiedIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </MuiAppBar>
                </HideOnScroll>

                <AddProfile open={addProfile} handleClose={changeToCloseAddProfile} />
            </Box>
            { children }
        </>

    )
}

export default NavBar