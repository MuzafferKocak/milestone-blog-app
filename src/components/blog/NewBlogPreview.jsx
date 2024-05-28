import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import ForumIcon from "@mui/icons-material/Forum"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import { Box, Button } from "@mui/material"

import { useSelector } from "react-redux"

const NewBlogPreview = ({ content, title, image }) => {
  const userInfo = useSelector((state) => state.auth.currentUser)

  return (
    <Card sx={{ maxWidth: 345, minWidth: "22rem" }}>
      <CardHeader
        avatar={<Avatar src={userInfo?.image} aria-label="recipe"></Avatar>}
        title={userInfo?.username}
        subheader={new Date().toLocaleDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ objectFit: "contain" }}
        src={image }
        alt="Paella dish"
      />
      <Box sx={{ marginLeft: "1rem", marginTop: "1.5rem" }}>
        <Typography variant="h6" color="#ffa000">
          {content ? content : "Blog Title"}
        </Typography>
      </Box>
      <CardContent sx={{ height: "100%", overflow: "auto" }}>
        <Typography
          sx={{
            height: "4rem",
            overflowWrap: "break-word",
            whiteSpace: "pre-line",
            textOverflow: "ellipsis",
          }}
          variant="body2"
          color="text.secondary"
        >
          {title ? title : "Write your blog post here"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>
        <Typography>5+</Typography>
        <IconButton aria-label="add to favorites">
          <ForumIcon sx={{ color: "orange" }} />
        </IconButton>
        <Typography>9+</Typography>
        <IconButton aria-label="add to favorites">
          <RemoveRedEyeIcon sx={{ color: "#07aaea" }} />
        </IconButton>
        <Typography>9+</Typography>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button>Read More</Button>
      </CardActions>
    </Card>
  )
}
export default NewBlogPreview