import { Box, Grid } from "@mui/material"
import NewBlogCard from "../components/blog/NewBlogCard"

const NewBlog = () => {
  return (
    <Box>
      <Grid 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: "3rem",
          gap: 5,
          marginBottom: "5rem",
        }}
        container
      >
        <Grid sx={{ display: "flex" }}>
          <Box sx={{ marginRight: "2rem", width:"25rem" }}>
            <NewBlogCard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default NewBlog