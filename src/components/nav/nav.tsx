import AppBar from "@mui/material/AppBar/AppBar";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Dish } from "../../models";

const fetchFuzzyDishes = async (searchQuery: string) =>
  (
    await axios.get<Dish[]>(
      `http://localhost:3000/dishes/fuzzy?search=${searchQuery}`
    )
  ).data;

export function Nav() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useQuery(
    ["fuzzy", searchQuery],
    async () => {
      if (searchQuery) {
        return fetchFuzzyDishes(searchQuery);
      }
    }
  );

  return (
    <AppBar position="static">
      <Toolbar
        sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}
      >
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Indian Food Suggestor
        </Typography>
        <Autocomplete
          options={data?.map((x) => x.name) || []}
          onInputChange={(event, newInputValue) => {
            setSearchQuery(newInputValue);
          }}
          autoComplete
          filterOptions={(x) => x}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField variant="standard" {...params} label="Search" />
          )}
        />
      </Toolbar>
    </AppBar>
  );
}
