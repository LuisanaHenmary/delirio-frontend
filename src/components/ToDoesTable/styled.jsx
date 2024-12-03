import { 
    TableCell,
    TableRow,
    tableCellClasses,
    styled
 } from "@mui/material";

 export const ToDoesTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: "linear-gradient(#3DA2DB, #006096)",
      color: theme.palette.common.white,
      fontWeight: "bold",
      border:0,
    },
    [`&.${tableCellClasses.body}`]: {
      border:0,
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