import {
    Toolbar,
    Typography,
    IconButton,
    Slide,
    useScrollTrigger
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useOpen } from '../../hooks/useOpen';
import "./index.css"

import { useLogout } from "../../hooks/useLogout"
import DrawerMenu from '../DrawerMenu';


const NavBar = () => {
    const { logout } = useLogout()
    const [openMenu, changeToOpenMenu, changeToCloseMenu] = useOpen()
    const trigger = useScrollTrigger();

    const handleClick = () => {
        changeToCloseMenu()
        logout();
    }

    return (
        <>
            <DrawerMenu openMenu={openMenu} changeToCloseMenu={changeToCloseMenu} handleClick={handleClick} />

            <Slide appear={false} direction="down" in={!trigger} >
                <MuiAppBar sx={{ backgroundColor: 'rgba(240, 248, 255, 0)', boxShadow: 0 }} >
                    <Toolbar>
                        <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'blue' }} component="div">
                            Delirio
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={changeToOpenMenu}
                            sx={{ color: 'black', padding: '10px' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </MuiAppBar>
            </Slide>
        </>

    )
}

/* 
            */

export default NavBar