import {createTheme} from "@mui/material/styles";

export const darkTheme = createTheme({
    typography: {
        button: {
            fontSize: "10px",
        },
    }, palette: {
        mode: 'dark',
    },
});
export const lightTheme = createTheme({
    typography: {
        button: {
            fontSize: "10px",
        },
    }, palette: {
        mode: 'light',
    },
});