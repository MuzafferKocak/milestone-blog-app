import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Typography from "@mui/material/Typography"
import { Button } from "@mui/material"
import useBlogCalls from "../../hooks/useBlogCalls"
import { useNavigate } from "react-router-dom"

const DeleteModal = ({ openDelete, handleCloseDelete, id }) => {
  const { deleteBlog } = useBlogCalls()
  const navigate = useNavigate()

  console.log(id)

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const deleteBLog = () => {
    deleteBlog("blogs", id)
    navigate("/")
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDelete}>
          <Box sx={style}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              What you are about to do is delete this blog. Are you sure you
              want to delete it?
            </Typography>
            <Box>
              <Button
                sx={{ color: "green", margin: "2rem" }}
                variant="outlined"
                onClick={handleCloseDelete}
              >
                Cancel
              </Button>
              <Button
                sx={{ color: "#ff0000", margin: "2rem" }}
                variant="outlined"
                onClick={deleteBLog}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default DeleteModal