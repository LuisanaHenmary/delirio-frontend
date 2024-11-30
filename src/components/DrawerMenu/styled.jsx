import { styled, Typography } from "@mui/material"

export const DelirioMenu = {
        sx: {
            background: "linear-gradient(#3DA2DB, #006096)",
            color: 'white',
            padding: 0,
            width:"15%"
        }
    }


export const TypographyMenu = styled(Typography)(
    ({ theme }) => `
    color:white;
    text-transform: uppercase;
    font-weight: bold;
  `,
  );