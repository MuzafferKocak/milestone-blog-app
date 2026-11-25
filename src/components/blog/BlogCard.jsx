import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import CategoryChip from "./CategoryChip";

//* Text auf eine bestimmte Zeilenanzahl begrenzen
const clampLines = (lines) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const BlogCard = ({
  id,
  title,
  author,
  category,
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
  const [likeCount, setLikeCount] = useState(likes?.length || 0);

  const commentCount = Array.isArray(comments) ? comments.length : 0;
  const postView = countOfVisitors || 0;

  const handleLikeButton = async () => {
    if (user) {
      await getLikeCreate(id, user.username);
      setIsLiked(!isLiked);
      setLikeCount(likeCount + (isLiked ? -1 : 1));
    } else {
      navigate("/login");
    }
  };

  const handleCommentIcon = (id) => {
    getDetailRead("blogs", id);
    navigate(`/blogdetail/${id}`);
  };

  const date = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  //* HTML-Tags aus dem Inhalt entfernen, damit der Auszug sauber ist
  const excerpt = (content || "").replace(/<[^>]*>/g, " ");

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {image ? (
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ height: 180, objectFit: "cover" }}
        />
      ) : (
        <Box sx={{ height: 180, bgcolor: "divider" }} />
      )}

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <CategoryChip name={category} />
          <Typography variant="caption" color="text.secondary">
            {author ? `${author} · ${date}` : date}
          </Typography>
        </Box>

        <Typography variant="h6" component="h2" sx={{ lineHeight: 1.3, ...clampLines(2) }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={clampLines(3)}>
          {excerpt}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, color: "text.secondary" }}>
        <IconButton
          size="small"
          aria-label="like"
          onClick={handleLikeButton}
          sx={{ color: isLiked ? "error.main" : "text.secondary" }}
        >
          {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
        <Typography variant="body2">{likeCount}</Typography>

        <IconButton
          size="small"
          aria-label="comments"
          onClick={() => (user ? handleCommentIcon(id) : navigate("/login"))}
          sx={{ color: "text.secondary", ml: 1 }}
        >
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2">{commentCount}</Typography>

        <VisibilityOutlinedIcon fontSize="small" sx={{ ml: 2, mr: 0.5 }} />
        <Typography variant="body2">{postView}</Typography>

        <Button size="small" onClick={() => navigate(`/blogdetail/${id}`)} sx={{ ml: "auto" }}>
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
