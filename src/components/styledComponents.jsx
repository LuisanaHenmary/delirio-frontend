import {
  TableCell,
  TableRow,
  tableCellClasses,
  styled,
  Button,
  Select,
  Input
} from '@mui/material';

export const SubmitButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(#3DA2DB, #006096)",
  color: "white",
  borderRadius: "20px",
  padding: "15px",
  textTransform: "capitalize",
  fontWeight: "bold"
}));

export const ToDoesTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(#3DA2DB, #006096)",
    color: theme.palette.common.white,
    fontWeight: "bold",
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    border: 0,
    fontSize: 14,
  },
}));

export const ToDoesTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const InputDelirioForm = styled(Input)(({ theme }) => ({
  background: "linear-gradient(#3DA2DB, #006096)", // Cambia este color
  color:"white",
  borderRadius: "10px",
  width:"250px",
  height:"35px",
  border: 0,
  margin: "20px",
  "&::before, &::after": {
    display: "none", // Oculta las líneas
  }
}));

export const DelirioSelectForm = styled(Select)(({ theme }) => ({
  background: "linear-gradient(#3DA2DB, #006096)", 
  borderRadius: "10px",
  width: "210px",
  margin:0,
  color: "#fff",
  "& .MuiSelect-icon": {
    color: "#fff", // Icono desplegable
  },
  "&:hover": {
    backgroundColor: "#1c86ee",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Elimina el borde del select
  },
}));

export const InputFullDelerio = styled(Input)(({ theme }) => ({
  background: "linear-gradient(#3DA2DB, #006096)", // Cambia este color
  padding: "8px",
  fontWeight:"bold",
  border: 0,
  "&::before, &::after": {
      display: "none", // Oculta las líneas
  },
}));