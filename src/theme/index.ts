import { createTheme } from "@mui/material";

export type ThemeMode = "light" | "dark";

export const theme = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: mode,
    },
  });
};
