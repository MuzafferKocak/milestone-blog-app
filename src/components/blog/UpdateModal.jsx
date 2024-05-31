import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Typography from "@mui/material/Typography"

const UpdateModal = ({ handleOpenUpdate, openUpdate, handleCloseUpdate }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#e1e5e1",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUpdate}
        onClose={handleCloseUpdate}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openUpdate}>
          <Box sx={style}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Update Blog
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Edit your blog post here.
            </Typography>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default UpdateModal