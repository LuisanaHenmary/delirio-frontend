import {
  Input,
  styled
} from '@mui/material';

export const DelirioInput = styled(Input)(({ theme }) => ({
  background: "linear-gradient(#3DA2DB, #006096)", // Cambia este color
  padding: "8px",
  borderRadius: "20px",
  border: 0,
  margin: "20px",
  "&::before, &::after": {
    display: "none", // Oculta las líneas
  },
}));

/*
"&:hover": {
    backgroundColor: "#e0e0e0", // Cambia el color al pasar el mouse
  },
  "&.Mui-focused": {
    backgroundColor: "#d0d0d0", // Cambia el color al enfocar
  }, */