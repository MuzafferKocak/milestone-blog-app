import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

//* Hinweis: Hier gibt es (wie vorher) noch kein Bearbeiten-Formular.
const UpdateModal = ({ openUpdate, handleCloseUpdate }) => {
  return (
    <Dialog
      open={openUpdate}
      onClose={handleCloseUpdate}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { border: 1, borderColor: "divider" } }}
      aria-labelledby="update-dialog-title"
    >
      <DialogTitle id="update-dialog-title">Edit post</DialogTitle>
      <DialogContent>
        <Box>
          <Typography color="text.secondary">Edit your blog post here.</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={handleCloseUpdate}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
