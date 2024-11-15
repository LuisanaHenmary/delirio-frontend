import {
    Drawer,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Slide,
    useScrollTrigger
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link as RouterLink } from "react-router-dom";
import { useOpen } from '../../hooks/useOpen';
import "./index.css"


const NavBar = () => {
    

    const [openMenu, changeToOpenMenu, changeToCloseMenu] = useOpen()
    const trigger = useScrollTrigger();

    return (
        <>
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
                
                        <>
                            <ListItem disablePadding component='a' href="http://localhost/Delirio" >
                                <ListItemButton>
                                    <ListItemText primary="Wordpress" />
                                </ListItemButton>
                            </ListItem>

                        </>
                </List>

            </Drawer >

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