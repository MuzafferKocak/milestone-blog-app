
import React, { useState } from "react";
import { Box, Avatar, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentForm = ({ comments, id, sendComment, formatDate, user }) => {
  const [handleComment, setHandleComment] = useState({ post: id, content: "" });

  console.log(sendComment)

  return (
    <Box sx={{ marginTop: "2rem" }}>
      {comments?.length === 0 ? (
        <Typography>Be the first to comment...</Typography>
      ) : (
        comments?.slice().reverse().map((comment) => (
          <Box
            key={comment._id}
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography
                  sx={{ color: "#FF7F3E" }}
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  {comment?.userId.username || "Unknown User"}
                </Typography>
                <Typography variant="caption">
                  {formatDate(comment?.createdAt)}
                </Typography>
              </Box>
            </Box>
            <Typography key={comment?.id} variant="body1" sx={{ marginLeft: "3.5rem" }}>
              {comment?.comment}
            </Typography>
          </Box>
        ))
      )}
      {user && (
        <Box sx={{ marginTop: "2rem" }}>
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            onChange={(e) => setHandleComment({ post: id, content: e.target.value })}
            value={handleComment.comment}
            rows={4}
            sx={{ width: "100%" }}
            placeholder="to Comment"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    sendComment(handleComment);
                    setHandleComment({ post: id, content: " " });
                  }}
                  sx={{ color: "#FF7F3E" }}
                >
                  Send
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CommentForm;