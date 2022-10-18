import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button/Button";
import { Dish } from "../../models";

interface IDishDetailsProps {
  dish: Dish;
  open: boolean;
  close(): void;
}
export function DishDetails({ dish, open, close }: IDishDetailsProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>{dish.name}</DialogTitle>
      <DialogContent>
        <pre>{JSON.stringify(dish)}</pre>
      </DialogContent>
      <DialogActions>
        <Button>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
