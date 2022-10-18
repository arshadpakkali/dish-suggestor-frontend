import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "react-intl";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { BaseLayout } from "./components/layout/Layout";

const appTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const routes = createBrowserRouter([{ path: "", element: <BaseLayout /> }]);
const queryClient = new QueryClient({});

function App() {
  return (
    <>
      <IntlProvider messages={{}} locale="en" defaultLocale="en">
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
          </QueryClientProvider>
        </ThemeProvider>
      </IntlProvider>
    </>
  );
}

export default App;
