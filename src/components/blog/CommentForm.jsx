import React, { useState } from "react";
import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentForm = ({ comments, id, sendComment, formatDate, user }) => {
  const [handleComment, setHandleComment] = useState({ post: id, content: "" });

  const handleSend = () => {
    sendComment(handleComment);
    setHandleComment({ post: id, content: "" });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
        Comments
      </Typography>

      {!comments?.length ? (
        <Typography color="text.secondary">Be the first to comment.</Typography>
      ) : (
        comments.map((comment) => (
          <Box
            key={comment._id}
            sx={{
              display: "flex",
              gap: 1.5,
              py: 2,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
            <Box>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
                <Typography variant="subtitle2">{comment?.userId?.username}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(comment?.createdAt)}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                {comment?.comment}
              </Typography>
            </Box>
          </Box>
        ))
      )}

      {user && (
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Write a comment"
            multiline
            rows={3}
            fullWidth
            value={handleComment.content}
            onChange={(e) => setHandleComment({ post: id, content: e.target.value })}
            placeholder="Share your thoughts..."
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend}>
              Add comment
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CommentForm;
