import { styled, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';



export const SaveButton = styled(Button)(
    ({ theme }) => `
    color:white;
    background: linear-gradient(#3DA2DB, #006096);
    margin-left:10px;
    border-radius:20px;
    text-transform: capitalize;
    font-weight: bold;
  `,
  );

  export const PlusIcon = styled(AddIcon)(
    ({ theme }) => `
    color:white;
  `,
  );