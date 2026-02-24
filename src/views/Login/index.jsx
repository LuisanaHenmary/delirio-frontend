

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

const Login = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
        {isMobile ? <MobileLayout /> : <DesktopLayout /> }
        </>
    )
}

export default Login;