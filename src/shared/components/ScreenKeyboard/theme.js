import {createTheme} from "@mui/material/styles";

export const darkTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        }, fontFamily: "Rubik",
    },

    palette: {
        mode: "dark",
    },
});
export const lightTheme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        }, fontFamily: "Rubik",
    },

    palette: {
        mode: "light",
    },
});