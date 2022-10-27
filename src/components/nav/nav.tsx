import AppBar from "@mui/material/AppBar/AppBar";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Dish } from "../../models";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import { LangContext, ThemeContext } from "../../App";
import { FormattedMessage } from "react-intl";
import { FormControl, InputLabel, Switch } from "@mui/material";

const fetchFuzzyDishes = async (searchQuery: string) =>
  (
    await axios.get<Dish[]>(
      `http://localhost:3000/dishes/fuzzy?search=${searchQuery}`
    )
  ).data;

export function Nav() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useQuery(["fuzzy", searchQuery], async () => {
    if (searchQuery) {
      return fetchFuzzyDishes(searchQuery);
    }
  });

  const langCtx = useContext(LangContext);
  const themeCtx = useContext(ThemeContext);

  if (!langCtx) return <FormattedMessage id="ERROR_MESSAGE" />;

  const { selectedLanguage, updateSelectedLanguage, availableLanguages } =
    langCtx;

  return (
    <AppBar position="static">
      <Toolbar
        sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}
      >
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          <FormattedMessage id="TITLE" />
        </Typography>
        <Autocomplete
          options={data?.map((x) => x.name) || []}
          onInputChange={(_event, newInputValue) => {
            setSearchQuery(newInputValue);
          }}
          autoComplete
          filterOptions={(x) => x}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField variant="standard" {...params} label="Search" />
          )}
        />
        <Select
          variant="outlined"
          value={selectedLanguage}
          onChange={(e) => {
            updateSelectedLanguage(e.target.value);
          }}
        >
          {availableLanguages.map((v) => {
            return <MenuItem value={v}>{v}</MenuItem>;
          })}
        </Select>

        <Switch
          color="secondary"
          defaultChecked
          onChange={(e) => {
            if (e.target.checked) {
              themeCtx.setSelectedTheme("dark");
            } else {
              themeCtx.setSelectedTheme("light");
            }
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
