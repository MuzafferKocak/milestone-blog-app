import { Box } from "@mui/material";
import NewBlogCard from "../components/blog/NewBlogCard";

const NewBlog = () => {
  return (
    <Box
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "1.5rem",
        marginBottom: "5.5rem",
      }}
    >
      <NewBlogCard />
    </Box>
  );
};

export default NewBlog;
