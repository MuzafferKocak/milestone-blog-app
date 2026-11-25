import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({ openDelete, handleCloseDelete, id }) => {
  const { deleteBlog } = useBlogCalls();
  const navigate = useNavigate();

  const deleteBLog = async () => {
    try {
      await deleteBlog("blogs", id);
      handleCloseDelete();
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Dialog
      open={openDelete}
      onClose={handleCloseDelete}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { border: 1, borderColor: "divider" } }}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">Delete this post?</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button variant="outlined" onClick={handleCloseDelete}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={deleteBLog}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
