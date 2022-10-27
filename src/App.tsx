import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { IntlProvider } from "react-intl";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { BaseLayout } from "./components/layout/Layout";
import lang from "./lang";
import { theme } from "./theme";

type LangKey = keyof typeof lang;

interface LangCtx {
  selectedLanguage: LangKey;
  updateSelectedLanguage(l: string): void;
  availableLanguages: LangKey[];
}

const routes = createBrowserRouter([{ path: "", element: <BaseLayout /> }]);
const queryClient = new QueryClient({});

export const LangContext = createContext<LangCtx | null>(null);

export const ThemeContext = createContext<any>(null);

function App() {
  const [selectedLang, setSelectedLang] = useState<LangKey>("english");

  const [selectedTheme, setSelectedTheme] = useState<"dark" | "light">("dark");

  const updateSelectedLanguage = (l: LangKey) => {
    setSelectedLang(l);
  };

  const langCtx: LangCtx = {
    updateSelectedLanguage,
    selectedLanguage: selectedLang,
    availableLanguages: Object.keys(lang) as LangKey[],
  };

  return (
    <>
      <LangContext.Provider value={langCtx}>
        <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
          <IntlProvider
            messages={lang[selectedLang]}
            locale="en"
            defaultLocale="en"
          >
            <ThemeProvider theme={theme(selectedTheme)}>
              <CssBaseline enableColorScheme />
              <QueryClientProvider client={queryClient}>
                <RouterProvider router={routes} />
              </QueryClientProvider>
            </ThemeProvider>
          </IntlProvider>
        </ThemeContext.Provider>
      </LangContext.Provider>
    </>
  );
}

export default App;
