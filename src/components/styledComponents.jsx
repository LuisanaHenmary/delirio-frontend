import {
    styled,
    Button
} from '@mui/material';

export const SubmitButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(#3DA2DB, #006096)",
    color: "white",
    borderRadius:"20px",
    padding: "10px",
    textTransform:"capitalize",
    fontWeight:"bold"
}));