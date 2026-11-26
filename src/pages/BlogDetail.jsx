import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogCalls from "../hooks/useBlogCalls";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateModal from "../components/blog/UpdateModal";
import DeleteModal from "../components/blog/DeleteModal";
import { setShowComments } from "../features/blogSlice";
import CommentForm from "../components/blog/CommentForm";
import CategoryChip from "../components/blog/CategoryChip";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { getDetailRead, getPostData, getLikeCreate, getCreateComment } =
    useBlogCalls();
  const { blogsDetail, showComments } = useSelector((state) => state.blog);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [userLike, setUserLike] = useState(false);
  const [countOfLikes, setCountOfLikes] = useState(0);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    getDetailRead("blogs", id);
    getPostData("blogs");
  }, [id]); // eslint-disable-line

  useEffect(() => {
    if (blogsDetail?.likes) {
      setUserLike(blogsDetail.likes.includes(user?.username));
      setCountOfLikes(blogsDetail.likes.length);
    }
  }, [blogsDetail, user?.username]);

  const handleLikeButton = async () => {
    if (user) {
      await getLikeCreate(id, user.username).then(() => {
        getDetailRead("blogs", id);
      });
    }
  };

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const sendComment = async (comment) => {
    const blogId = comment.post;
    const userId = user?._id;
    const commentContent = comment.content;
    if (!userId) {
      console.error("User ID is undefined. Please log in.");
      return;
    }

    try {
      await getCreateComment(commentContent, blogId, userId);
      getDetailRead("blogs", id);
    } catch (error) {
      console.error("Error while sending comment:", error);
    }
  };

  //* Bearbeiten/Löschen nur für den Autor oder einen Admin (gleiche Regel wie im Backend)
  const authorId = blogsDetail?.userId?._id || blogsDetail?.userId;
  const canEdit =
    Boolean(user?._id) && (user?.isAdmin || authorId === user?._id);

  return (
    <Container maxWidth={false} sx={{ maxWidth: 760, py: { xs: 4, md: 6 } }}>
      {/* Bild */}
      {blogsDetail?.image && (
        <Box
          component="img"
          src={blogsDetail.image}
          alt={blogsDetail?.title}
          sx={{
            width: "100%",
            maxHeight: 420,
            objectFit: "cover",
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            mb: 3,
          }}
        />
      )}

      {/* Kategorie, Titel, Autor */}
      <CategoryChip name={blogsDetail?.categoryId?.name} />
      <Typography variant="h3" component="h1" sx={{ mt: 1.5, mb: 2, fontSize: { xs: "2rem", md: "2.6rem" } }}>
        {blogsDetail?.title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
        <Avatar sx={{ width: 36, height: 36 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{blogsDetail?.userId?.username}</Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(blogsDetail?.createdAt)}
          </Typography>
        </Box>

        {canEdit && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditOutlinedIcon />}
              onClick={handleOpenUpdate}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleOpenDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>

      {openUpdate && (
        <UpdateModal
          handleOpenUpdate={handleOpenUpdate}
          openUpdate={openUpdate}
          handleCloseUpdate={handleCloseUpdate}
          blog={blogsDetail}
          id={id}
        />
      )}
      {openDelete && (
        <DeleteModal
          handleOpenDelete={handleOpenDelete}
          openDelete={openDelete}
          handleCloseDelete={handleCloseDelete}
          id={id}
        />
      )}

      <Divider sx={{ my: 3 }} />

      {/* Inhalt */}
      <Box
        sx={{
          lineHeight: 1.7,
          fontSize: "1.05rem",
          "& img": { maxWidth: "100%", height: "auto", borderRadius: 2 },
          "& a": { color: "primary.main" },
        }}
        dangerouslySetInnerHTML={{ __html: blogsDetail?.content }}
      />

      {/* Likes, Kommentare, Aufrufe */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: 4,
          py: 1,
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
          color: "text.secondary",
        }}
      >
        <IconButton
          onClick={handleLikeButton}
          aria-label="like"
          sx={{ color: userLike ? "error.main" : "text.secondary" }}
        >
          {userLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">{countOfLikes}</Typography>

        <IconButton
          aria-label="comments"
          onClick={() => dispatch(setShowComments(!showComments))}
          sx={{ color: showComments ? "primary.main" : "text.secondary", ml: 1 }}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body2">{blogsDetail?.comments?.length || 0}</Typography>

        <VisibilityOutlinedIcon sx={{ ml: "auto", mr: 0.5 }} />
        <Typography variant="body2">{blogsDetail?.countOfVisitors || 0}</Typography>
      </Box>

      {showComments && (
        <CommentForm
          comments={blogsDetail?.comments}
          id={id}
          sendComment={sendComment}
          formatDate={formatDate}
          user={user}
        />
      )}
    </Container>
  );
};

export default BlogDetail;
