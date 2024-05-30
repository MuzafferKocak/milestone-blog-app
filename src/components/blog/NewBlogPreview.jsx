import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"



const NewBlogPreview = ({ content, title, image }) => {
  const userInfo = useSelector((state) => state.auth.currentUser)

  return (
    <Card sx={{ maxWidth: 345, minWidth: "22rem", height:"452px" }}>
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
      
    </Card>
  )
}
export default NewBlogPreview