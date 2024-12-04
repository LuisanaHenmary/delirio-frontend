import {
    styled
} from '@mui/material';

export const CustomStrong = styled('strong')(({ theme }) => ({
    background: "linear-gradient(#3DA2DB, #006096)",
    color: "white",
    padding: "10px",
    borderRadius: "10px 0px 0 10px",
    height:"100%",
}));

export const DataTag = styled('span')(({ theme }) => ({
    background: "white",
    color: "#006096",
    padding: "10px",
    borderRadius: "0 10px 10px 0",
    height:"100%",
    border: "1px solid #006096"
}));