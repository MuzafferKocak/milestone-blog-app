import {
    Avatar,
    Box,
    CardActions,
    CardHeader,
    IconButton,
    Paper,
    TextField,
    Typography,
  } from "@mui/material"
  import React, { useEffect, useState } from "react"
  import { useSelector } from "react-redux"
  import { useParams } from "react-router-dom"
  import useBlogCalls from "../hooks/useBlogCalls"
  import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
  import FavoriteIcon from "@mui/icons-material/Favorite"
  import ShareIcon from "@mui/icons-material/Share"
  import ForumIcon from "@mui/icons-material/Forum"
  import SendIcon from "@mui/icons-material/Send"
  import MoreVertIcon from "@mui/icons-material/MoreVert"
  import Menu from "@mui/material/Menu"
  import MenuItem from "@mui/material/MenuItem"
  import UpdateModal from "../components/blog/UpdateModal"
  import DeleteModal from "../components/blog/DeleteModal"
  
  const BlogDetail = () => {
    const {blogsDetail} = useSelector((state) => state.blog)
    const currentUser = useSelector((state) => state.auth.currentUser)
    const { getDetailRead, getLikeCreate, getPostData, getCreateComment } =
      useBlogCalls()
    const [handleComment, setHandleComment] = useState({ post: "", content: "" })
  
    const [openUpdate, setOpenUpdate] = React.useState(false)
    const [openDelete, setOpenDelete] = React.useState(false)
  
    const { id } = useParams()
    const blogLikes = useSelector((state) => state.blog.blog)
    const userId = useSelector((state) => state.auth.currentUser)
    const likedPost = []
  
    const formatDate = (dateString) => {
        console.log("Original Date String:", dateString); 
      const date = new Date(dateString)
      console.log("Parsed Date:", date); 
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "UTC",
      }
      return date.toLocaleString("de-DE", options)
    }
    /* eslint-disable */
    blogLikes?.map((item) => {
      const userLikes = item.likes_n
      return userLikes?.map((i) => {
        if (userId?.id === i.user_id) {
          likedPost.push(i.post_id)
        }
      })
    })
  
    const [anchorEl, setAnchorEl] = useState(null)
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleMenuClose = () => {
      setAnchorEl(null)
    }
  
    const handleOpenUpdate = () => setOpenUpdate(true)
    const handleCloseUpdate = () => setOpenUpdate(false)
  
    const handleOpenDelete = () => setOpenDelete(true)
    const handleCloseDelete = () => setOpenDelete(false)
  
    useEffect(() => {
      getDetailRead("blogs", id)
      console.log("idesi:", id)

      getPostData("blogs")
      
    }, []) // eslint-disable-line

    useEffect(() => {
        console.log('blogsDetail:', blogsDetail);  // API'den dönen veriyi kontrol et
      }, [blogsDetail]);
  
    const handleLikeButton = () => {
      getLikeCreate("likes", id)
      setTimeout(() => {
        getDetailRead("blogs", id)
        getPostData("blogs")
      }, 10)
    }
    const sendComment = (comment) => {
      console.log(id)
      getCreateComment("comments", id, comment)
      setTimeout(() => {
        getDetailRead("blogs", id)
      }, 100)
    }
  
    return (
      <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <Paper elevation={4} sx={{ padding: "1rem 2rem" }}>
          <CardHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              top: 0,
              color: "#ffa000",
            }}
            title={<Typography variant="h4">{blogsDetail?.title}</Typography>}
            action={
              blogsDetail?.author === currentUser?.username && (
                <React.Fragment>
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
                        handleMenuClose()
                        handleOpenUpdate()
                      }}
                    >
                      Update Blog
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose()
                        handleOpenDelete()
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
                </React.Fragment>
              )
            }
          />
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Avatar />
            <Box sx={{ marginLeft: "1rem" }}>
              <Typography variant="subtitle1">{blogsDetail?.author}</Typography>
              <Typography variant="subtitle2">
                {formatDate(blogsDetail?.publish_date)}
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
          <div
            dangerouslySetInnerHTML={{ __html: blogsDetail?.content }}
          ></div>
          
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <CardActions disableSpacing>
                <IconButton
                  onClick={handleLikeButton}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon
                    sx={{
                      color: likedPost.includes(+id) ? "red" : "white",
                    }}
                  />
                </IconButton>
                <Typography>{blogsDetail?.likes}</Typography>
                <IconButton aria-label="add to favorites">
                  <ForumIcon sx={{ color: "#ffa000" }} />
                </IconButton>
                <Typography>{blogsDetail?.comment_count}</Typography>
              </CardActions>
            </Box>
            <Box>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <RemoveRedEyeIcon sx={{ color: "#07aaea" }} />
                </IconButton>
                <Typography>{blogsDetail?.post_views}</Typography>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Box>
          </Box>
          <hr style={{ width: "30rem" }} />
          <Box sx={{ marginTop: "2rem" }}>
            {blogsDetail?.comment_count === 0 ? (
              <Typography>Be the first to comment...</Typography>
            ) : (
              blogsDetail?.comments?.map((item) => (
                <Box key={item?.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    margin: "1rem auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                    >
                      <Typography
                        sx={{ color: "#ffa000" }}
                        variant="subtitle1"
                        fontWeight="bold"
                      >
                        {item?.user}
                      </Typography>
                      <Typography variant="caption">
                        {formatDate(item?.time_stamp)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    key={item?.id}
                    variant="body1"
                    sx={{ marginLeft: "3.5rem" }}
                  >
                    {item?.content}
                  </Typography>
                  <hr style={{ width: "30rem" }} />
                </Box>
              ))
            )}
            <Box sx={{ marginTop: "2rem" }}>
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                onChange={(e) =>
                  setHandleComment({ post: id, content: e.target.value })
                }
                value={handleComment.content}
                rows={4}
                sx={{ width: "29rem" }}
                placeholder="to Comment"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        sendComment(handleComment, id)
                        setHandleComment({ post: id, content: "" })
                      }}
                      sx={{ color: "#ffa000" }}
                    >
                      <SendIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }
  
  export default BlogDetail