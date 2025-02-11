import {
    Toolbar,
    Typography,
    IconButton,
    Box,
    styled
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { useOpen } from '../../hooks/useOpen';
import "./index.css"

import { useLogout, useClear } from "../../hooks/useLogout"
import DrawerMenu from '../DrawerMenu';
import AddProfile from "../../views/AddProfile";

import { HideOnScroll } from '../HideOnScroll';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));


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
                <Box sx={{ display: 'flex' }}>
                    <HideOnScroll>
                        <AppBar sx={{ backgroundColor: "rgba(255, 255, 255, 0);", boxShadow: 0 }} open={openMenu} >
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
                        </AppBar>
                    </HideOnScroll>
                    <DrawerMenu
                        openMenu={openMenu}
                        changeToCloseMenu={changeToCloseMenu}
                        handleClick={handleClick}
                        changeToOpenAddProfile={changeToOpenAddProfile}
                    />

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            transition: 'margin 0.3s',
                            marginLeft: openMenu ? `${drawerWidth}px` : '0px',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
                
            </Box>
            <AddProfile open={addProfile} handleClose={changeToCloseAddProfile} />

        </>

    )
}

export default NavBar