import Box from "@mui/material/Box/Box";
import { DishesList } from "../dishesList/dishesList";
import { Nav } from "../nav/nav";

export function BaseLayout() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      gap={5}
    >
      <Nav />
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={5}
      >
        <DishesList />
      </Box>
    </Box>
  );
}
