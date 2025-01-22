import { useSelector } from "react-redux";
import BlogCard from "../components/blog/BlogCard";
import useBlogCalls from "../hooks/useBlogCalls";
import { useEffect, useState } from "react";
import { Box, Container, Grid, Pagination, Stack } from "@mui/material";

const Dashboard = () => {
  const { getPostData, getBlogsPage } = useBlogCalls();
  const { blogs, totalPages } = useSelector((state) => state.blog);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (e,page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    getPostData("blogs");
  }, []); // eslint-disable-line
  

  useEffect(() => {
    getBlogsPage(currentPage, 6);
  }, [currentPage]); // eslint-disable-line


  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3rem",
          marginBottom: "3rem",
          gap: 3,
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
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          
          sx={{
            display: "flex", justifyContent: "center",
            "& .MuiPaginationItem-root": {
              "&.Mui-selected": {
                backgroundColor: "#12738d",
                color: "white",
                "&:hover": {
                  backgroundColor: "#4dc1e2",
                },
              },
              "&:hover": {
                backgroundColor: "#096279",
              },
            },
          }}
        />
      </Stack>
      <div style={{ paddingBottom: "7rem" }}></div>
    </Container>
  );
};

export default Dashboard;
