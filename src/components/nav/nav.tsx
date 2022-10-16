import AppBar from "@mui/material/AppBar/AppBar";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";

export function Nav() {
  return (
    <AppBar>
      <Toolbar
        sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}
      >
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Indian Food Suggestor
        </Typography>
        <Autocomplete
          options={[1, 2, 3]}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField variant="standard" {...params} label="Search" />
          )}
        />
      </Toolbar>
    </AppBar>
  );
}
