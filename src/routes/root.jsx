import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Root = () =>{
    return (
        <Box>
            welcome
            <Box component="div" id="detail" className="main-box">
                <Outlet />
            </Box>

        </Box>
    )
}

export default Root