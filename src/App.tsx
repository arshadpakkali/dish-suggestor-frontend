import Box from "@mui/material/Box/Box";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "./App.css";
import { DishesList } from "./components/dishesList/dishesList";
import { Nav } from "./components/nav/nav";

const appTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <Nav />
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DishesList />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
