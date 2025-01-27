import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ForumIcon from "@mui/icons-material/Forum";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Button } from "@mui/material";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const BlogCard = ({
  id,
  title,
  author,
  content,
  image,
  likes,
  countOfVisitors,
  createdAt,
  comments,
}) => {
  const { getLikeCreate, getDetailRead } = useBlogCalls();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [isLiked, setIsLiked] = useState(likes?.includes(user?.username));
  const [likeCount, setLikeCount] = useState(likes.length || 0);

  const commentCount = Array.isArray(comments) ? comments.length : 0;
  const postView = countOfVisitors || 0;

  const handleLikeButton = async () => {
    if (user) {
      await getLikeCreate(id, user.username);
      setIsLiked(!isLiked);
      setLikeCount(likeCount + (isLiked ? -1 : 1));
      // getPostData("blogs");
    } else {
      navigate("/login");
    }
  };

  const handleCommentIcon = (id) => {
    // console.log(id);
    getDetailRead("blogs", id);
    navigate(`/blogdetail/${id}`);
  };

  const dateString = createdAt;
  const dateObj = new Date(dateString);
  const formattedDate = `${dateObj.getDate()}.${
    dateObj.getMonth() + 1
  }.${dateObj.getFullYear()}`;
  const formattedTime = dateObj.toLocaleTimeString("de-DE");
  const result = `${formattedDate} ${formattedTime}`;

  return (
    <Card sx={{ maxWidth: 345, height: "455px" }}>
      <CardHeader
        avatar={<Avatar src={user.avatar} aria-label="recipe"></Avatar>}
        action={<IconButton aria-label="settings"></IconButton>}
        title={author}
        subheader={result}
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ objectFit: "cover",width: '100%',height: '200px', maxHeight: '200px' }}
        image={image}
        alt="Image"
      />
      <CardContent>
        <Typography variant="h6" color="#FF6969" >
        {title.length > 25 ? `${title.substring(0, 27)}...` : title}
        </Typography>
        <Typography
          sx={{ height: "4rem" }}
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{
            __html: content.substring(0, 140) + "...",
          }}
        ></Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "center", gap: ".3rem" }}
      >
        <IconButton aria-label="add to favorites" onClick={handleLikeButton}>
          <FavoriteIcon
            sx={{
              color: isLiked ? "red" : "#C7C8CC",
            }}
          />
        </IconButton>
        <Typography>{likeCount}</Typography>
        <IconButton
          sx={{ color: "#40A578" }}
          onClick={() => (user ? handleCommentIcon(id) : navigate("/login"))}
          aria-label="add to favorites"
        >
          <ForumIcon />
        </IconButton>
        <Typography>{commentCount}</Typography>
        <IconButton sx={{ color: "#FD9B63" }} aria-label="add to favorites">
          <RemoveRedEyeIcon />
        </IconButton>
        <Typography>{postView}</Typography>

        <Button onClick={() => navigate(`/blogdetail/${id}`)}>Read More</Button>
      </CardActions>
    </Card>
  );
};
export default BlogCard;
