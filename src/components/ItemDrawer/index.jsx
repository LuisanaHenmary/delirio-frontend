import {
    ListItem,
    ListItemButton,
    ListItemText,
    styled
} from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import WhiteAntlers from "../../assets/whiteAntlers.svg"

export const ItemDrawer = styled(ListItemButton)(({ theme }) => ({
    textAlign: "center",
    marginLeft: 0,
    "&.Mui-selected": {
        backgroundColor: "#006096",
        color: "white",

    }
}));


export const SelectedIcon = () => {
    return (

        <img src={WhiteAntlers} alt='d' width={"40px"} height={"40px"} />

    )
}

const HomeLink = ({location}) => {
    return (
        <ListItem
            disablePadding

        >
            <>
                {(location.pathname === "/home") && <SelectedIcon />}
                <ItemDrawer
                    component={RouterLink}
                    to="home"
                    selected={location.pathname === "/home"}

                >
                    <ListItemText primary="Home" />
                </ItemDrawer>
            </>
        </ListItem>
    )
}

export const AdminOptions = ({ changeToOpenAddProfile, location }) => {


    return (
        <>

            <HomeLink location={location} />
            <ListItem disablePadding >

                <>
                    {(location.pathname === "/statistics") && <SelectedIcon />}
                    <ItemDrawer
                        component={RouterLink}
                        to="/statistics"
                        selected={location.pathname === "/statistics"}
                    >
                        <ListItemText primary="Estadisticas" />
                    </ItemDrawer>

                </>

            </ListItem>

            <ListItem disablePadding >
                <ItemDrawer onClick={changeToOpenAddProfile} >
                    <ListItemText primary="Crear perfil" sx={{color: "white"}} />
                </ItemDrawer>
            </ListItem>

            <ListItem disablePadding >
                <>
                    {(location.pathname === "/to-does") && <SelectedIcon />}

                    <ItemDrawer
                        component={RouterLink}
                        to="/to-does"
                        selected={location.pathname === "/to-does"}
                    >

                        <ListItemText primary="Tareas" />
                    </ItemDrawer>
                </>
            </ListItem>

        </>
    )

}

export const EmployerOptions = ({ location }) => {

    return (
        <>
            <HomeLink location={location} />
            <ListItem disablePadding>
                <>
                    {(location.pathname === "/to-does") && <SelectedIcon />}

                    <ItemDrawer
                        component={RouterLink}
                        to="/to-does"
                        selected={location.pathname === "/to-does"}
                    >

                        <ListItemText primary="Tareas" />
                    </ItemDrawer>
                </>
            </ListItem>
        </>
    )

}