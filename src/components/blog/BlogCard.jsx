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
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Button } from "@mui/material"
import useBlogCalls from "../../hooks/useBlogCalls"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
// import { useEffect } from "react"
// import React, { useState, useEffect } from 'react';



const BlogCard = ({
  id,
  title,
  author,
  content,
  image,
  likes,
  countOfVisitors,
  createdAt,
  comments
}) => {
  const { getLikeCreate, getPostData, getDetailRead } = useBlogCalls()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const userId = useSelector((state) => state.auth.user)
  // const likedPost = [];
  // const likedPost = likes.filter(item => item.user_id === userId);
  // const { likes } = useBlogCalls();

  

  
  const likeCount = Array.isArray(likes) ? likes.length : likes || 0;
  const commentCount = Array.isArray(comments) ? comments.length : 0;
  const postView = countOfVisitors || 0;

  // const handleLikeButton = (id) => {
    
  //   console.log("Liking post:", id);
  //   getLikeCreate("blogs", id)
  //   setTimeout(() => {
  //     getPostData("blogs")
  //   }, 100)
  // }
  const handleLikeButton = () => {
    user ? getLikeCreate(id).then(() => getPostData("blogs")) : navigate("/login");
  };
//   console.log("likes:", likes);
// console.log("userId:", userId);
// console.log("LikedPost",likedPost);
// console.log("likedPost.includes(id):", likedPost.includes(id));
// console.log("Rengi belirleme koşulu:", likedPost.includes(id) ? "red" : "white");
// likes.forEach((item)=>{
//   console.log("item:", item);
//   if(item.user_id === userId){
//     likedPost.push(item.post_id)
//   }
// })

const handleCommentIcon = (id) => {
  getDetailRead("blogs", id)
  navigate(`/blogdetail/${id}`)
}

// likes.forEach((item) => {
//   console.log(item);
//   const userLikes = item.likes;
//   userLikes?.forEach((i) => {
//     console.log(item.likes);
//     if (userId?.id === i.user_id) {
//       likedPost.push(i.post_id);
//     }
   
//   });
// });



  const dateString = createdAt
  const dateObj = new Date(dateString)
  const formattedDate = `${dateObj.getDate()}.${
    dateObj.getMonth() + 1
  }.${dateObj.getFullYear()}`
  const formattedTime = dateObj.toLocaleTimeString("de-DE")
  const result = `${formattedDate} ${formattedTime}`
  

  

  

  

  

  return (
    <Card sx={{ maxWidth: 345, height:"455px" }}>
      <CardHeader
        avatar={<Avatar src={image} aria-label="recipe"></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={author}
        subheader={result}
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ objectFit: "contain" }}
        image={image}
        alt="Image"
      />
      <CardContent>
        <Typography variant="h6" color="#ffa000">
          {title}
        </Typography>
        <Typography
          sx={{ height: "4rem" }}
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: content.substring(0, 140) + "..." }}
        >
          {/* {content?.substring(0, 140) + "..."} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{display: "flex", justifyContent: "center", gap: ".3rem"}}>
        <IconButton aria-label="add to favorites"
          onClick={handleLikeButton}>
            
          
          <FavoriteIcon
            sx={{ color: likes.includes(id) ? "red" : "white"    
            }}
          />
        </IconButton>
        <Typography>{likeCount}</Typography>
        <IconButton
          sx={{ color: "green" }}
          onClick={() =>
            user ? handleCommentIcon(id) : navigate("/login")
          }
          aria-label="add to favorites"
        >
          <ForumIcon />
        </IconButton>
        <Typography>{commentCount}</Typography>
        <IconButton sx={{ color: "#07aaea" }} aria-label="add to favorites">
          <RemoveRedEyeIcon />
        </IconButton>
        <Typography>{postView}</Typography>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <Button onClick={() => navigate(`/blogdetail/${id}`)}>Read More</Button>
      </CardActions>
    </Card>
  )
}
export default BlogCard