import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import NewBlogPreview from "./NewBlogPreview";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useNavigate } from "react-router-dom";

const NewBlogCard = () => {
  const [newBlogInfo, setNewBlogInfo] = useState({
    title: "",
    content: "",
    image: "",
    categoryId: "",
    status: "p",
  });
  const navigate = useNavigate();

  const { title, content, image } = newBlogInfo;

  const { getCategories, getNewBlogCreate, getBlogsPage } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getCategories("categories");
  }, []); // eslint-disable-line

  const handleFromChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setNewBlogInfo({ ...newBlogInfo, categoryId: value });
    } else {
      setNewBlogInfo({ ...newBlogInfo, [name]: value });
    }
  };

  const submitBlog = () => {
    const newBlogData = {
      ...newBlogInfo,
      userId: user?._id,
    };
    getNewBlogCreate("blogs", newBlogData);
    getBlogsPage(1, 6);
  };

  const categoryName = categories?.find(
    (category) => category?._id === newBlogInfo.categoryId
  )?.name;

  return (
    <Grid container spacing={3}>
      {/* Formular */}
      <Grid item xs={12} md={7}>
        <Card>
          <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={newBlogInfo?.title || ""}
              onChange={handleFromChange}
            />
            <TextField
              required
              fullWidth
              id="image"
              label="Image URL"
              name="image"
              placeholder="https://..."
              value={newBlogInfo?.image || ""}
              onChange={handleFromChange}
            />
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                label="Category"
                name="category"
                value={newBlogInfo?.categoryId || ""}
                onChange={handleFromChange}
              >
                {categories?.map((category) => (
                  <MenuItem key={category?._id} value={category?._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              multiline
              minRows={8}
              id="blog"
              label="Content"
              name="content"
              value={newBlogInfo?.content || ""}
              onChange={handleFromChange}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={newBlogInfo.status === "p"}
                    onChange={(e) =>
                      setNewBlogInfo({
                        ...newBlogInfo,
                        status: e.target.checked ? "p" : "d",
                      })
                    }
                  />
                }
                label={newBlogInfo.status === "p" ? "Publish now" : "Save as draft"}
                sx={{ color: "text.secondary" }}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
                onClick={() => {
                  submitBlog();
                  navigate("/");
                }}
              >
                Publish
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Vorschau */}
      <Grid item xs={12} md={5}>
        <NewBlogPreview
          title={title}
          content={content}
          image={image}
          category={categoryName}
        />
      </Grid>
    </Grid>
  );
};

export default NewBlogCard;
