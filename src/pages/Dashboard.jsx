import { useSelector } from "react-redux";
import BlogCard from "../components/blog/BlogCard";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect } from "react";
import { Box, Grid } from "@mui/material";

const Dashboard = () => {
  const { getPostData } = useBlogCalls();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    getPostData("blogs");
  }, []); // eslint-disable-line

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "3rem",
        marginBottom: "5rem",
      }}
    >
      <Grid container spacing={3} sx={{ maxWidth: "70rem", width: "100%" }}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <BlogCard
              id={item._id}
              title={item.title}
              author={item.author}
              content={item.content}
              image={item.image}
              likes={item.likes}
              countOfVisitors={item.countOfVisitors}
              createdAt={item.createdAt}
              comments={item.comments}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
