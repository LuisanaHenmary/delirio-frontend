import {
  TableCell,
  TableRow,
  tableCellClasses,
  styled,
  Button,
  Select,
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextareaAutosize
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
  color: "white",
  borderRadius: "10px",
  width: "250px",
  height: "35px",
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
  margin: 0,
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

export const DelirioFullWidthSelectForm = styled(Select)(({ theme }) => ({
  background: "linear-gradient(#3DA2DB, #006096)",
  borderRadius: "10px",
  margin: 0,
  "& .MuiSelect-icon": {
    color: "#fff", // Icono desplegable
  },

}));

export const InputFullDelerio = styled(Input)(({ theme }) => ({
  background: "linear-gradient(#3DA2DB, #006096)", // Cambia este color
  padding: "8px",
  fontWeight: "bold",
  border: 0,
  "&::before, &::after": {
    display: "none", // Oculta las líneas
  },
}));

export const SocialMedios = ({ formik, isDisable=false }) => {
  return (
    <>
      <FormGroup >

        <FormControlLabel
          name="by_instragram"
          checked={formik.values.by_instragram}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          control={<Checkbox />}
          label="Instagram"
          disabled={isDisable}
        />

        <FormControlLabel
          name="by_facebook"
          checked={formik.values.by_facebook}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          control={<Checkbox />}
          label="Facebook"
          disabled={isDisable}
        />

        <FormControlLabel
          name="by_tiktok"
          checked={formik.values.by_tiktok}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          control={<Checkbox />}
          label="Tiktok"
          disabled={isDisable}
        />

      </FormGroup>
    </>
  )
}


const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  export const TextArea = styled(TextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );