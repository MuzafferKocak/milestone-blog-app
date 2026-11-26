import { Box, Container, Typography } from "@mui/material";
import NewBlogCard from "../components/blog/NewBlogCard";

const NewBlog = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          New Post
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Write something worth reading. The preview updates as you type.
        </Typography>
      </Box>
      <NewBlogCard />
    </Container>
  );
};

export default NewBlog;
