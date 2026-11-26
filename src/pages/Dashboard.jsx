import { useSelector } from "react-redux";
import BlogCard from "../components/blog/BlogCard";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect, useState } from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";

const Dashboard = () => {
  const { getBlogsPage } = useBlogCalls();
  const { blogs, totalPages } = useSelector((state) => state.blog);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (e, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getBlogsPage(currentPage, 6);
  }, [currentPage]); // eslint-disable-line

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Latest Posts
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Thoughts on technology, society and everything in between.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {blogs?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <BlogCard
              id={item._id}
              title={item.title}
              author={item.userId?.username}
              category={item.categoryId?.name}
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

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
