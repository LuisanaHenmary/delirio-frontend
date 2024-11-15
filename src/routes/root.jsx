import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/NavBars";

const Root = () =>{
    return (
        <Box>
            <NavBar />
            <Box component="div" id="detail" className="main-box">
                <Outlet />
            </Box>

        </Box>
    )
}

export default Root