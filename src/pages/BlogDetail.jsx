import {
  Avatar,
  Box,
  CardActions,
  CardHeader,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogCalls from "../hooks/useBlogCalls";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UpdateModal from "../components/blog/UpdateModal";
import DeleteModal from "../components/blog/DeleteModal";
import { setShowComments } from "../features/blogSlice";
import CommentForm from "../components/blog/CommentForm";

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
      return "Invalid Date";
    }
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "UTC",
    };
    return date.toLocaleString("de-DE", options);
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
        // getPostData("blogs");
      });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  return (
    <Box
      sx={{
        maxWidth: "750px",
        margin: "0 auto",
        padding: "2rem",
        marginBottom: "5rem",
      }}
    >
      <Paper elevation={4} sx={{ padding: "1rem 2rem" }}>
        <CardHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            top: 0,
            color: "#FF6969",
          }}
          title={<Typography variant="h4">{blogsDetail?.title}</Typography>}
          action={
            blogsDetail?._id?.user === user?.user && (
              <>
                <IconButton onClick={handleMenuClick} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleOpenUpdate();
                    }}
                  >
                    Update Blog
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleOpenDelete();
                    }}
                  >
                    Delete Blog
                  </MenuItem>
                </Menu>
                {openUpdate && (
                  <UpdateModal
                    handleOpenUpdate={handleOpenUpdate}
                    openUpdate={openUpdate}
                    handleCloseUpdate={handleCloseUpdate}
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
              </>
            )
          }
        />
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <Avatar />
          <Box sx={{ marginLeft: "1rem" }}>
            <Typography variant="subtitle1">
              {blogsDetail?.userId?.user}
            </Typography>
            <Typography variant="subtitle2">
              {formatDate(blogsDetail?.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ maxWidth: "80%", height: "auto", marginBottom: "1rem" }}
            src={blogsDetail?.image}
            alt="blog_image"
          />
        </Box>
        <div dangerouslySetInnerHTML={{ __html: blogsDetail?.content }}></div>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <CardActions disableSpacing>
              <IconButton
                onClick={handleLikeButton}
                aria-label="add to favorites"
              >
                <FavoriteIcon
                  sx={{
                    color: userLike ? "red" : "#C7C8CC",
                  }}
                />
              </IconButton>
              <Typography>{countOfLikes}</Typography>

              <IconButton
                aria-label="comment"
                onClick={() => dispatch(setShowComments(!showComments))}
              >
                <ForumIcon sx={{ color: "#40A578" }} />
              </IconButton>
              <Typography>{blogsDetail?.comments?.length}</Typography>
            </CardActions>
          </Box>
          <Box>
            <CardActions disableSpacing>
              <IconButton aria-label="visibility">
                <RemoveRedEyeIcon sx={{ color: "#FD9B63" }} />
              </IconButton>
              <Typography>{blogsDetail?.countOfVisitors}</Typography>
            </CardActions>
          </Box>
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
      </Paper>
    </Box>
  );
};

export default BlogDetail;
