import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

function ConfirmDialog({ open, title, message, onClose, onConfirm }) {

  return (
    <Dialog open={open} onClose={onClose}>
      
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button color="error" variant="contained" onClick={onConfirm}>
          Eliminar
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default ConfirmDialog;
