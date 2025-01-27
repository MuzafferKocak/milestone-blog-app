import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  FormControl,
  IconButton,
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const { title, content, image } = newBlogInfo; 

  const { getCategories, getNewBlogCreate, getPostData, getBlogsPage } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  // console.log(categories);

  useEffect(() => {
    getCategories("categories");
  }, []); // eslint-disable-line

  const handleFromChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setSelectedCategory(value);
      setNewBlogInfo({ ...newBlogInfo, categoryId: value });
    } else {
      setNewBlogInfo({ ...newBlogInfo, [name]: value });
    }
  };

  const submitBlog = () => {
    const newBlogData = {
      ...newBlogInfo,
      userId: user?._id,
    }
    getNewBlogCreate("blogs", newBlogData);
    getBlogsPage(1, 6)
    // getPostData("blogs");

  };

  const isFormValid = () => {
    return title.trim() && content.trim() && image.trim();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",

          marginBottom: "1.5rem",
        }}
      >
        <CardHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          avatar={<Avatar src={image} aria-label="recipe"></Avatar>}
          action={
            <Box>
              <Switch
                checked={newBlogInfo.status === "p"}
                onChange={(e) =>
                  setNewBlogInfo({
                    ...newBlogInfo,
                    status: e.target.checked ? "p" : "d",
                  })
                }
              />
            </Box>
          }
          title={""}
          subheader={new Date().toLocaleDateString()}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "11rem",
            gap: 1,

            width: "100%",
          }}
        >
          <TextField
            margin="normal"
            required
            sx={{ width: "95%" }}
            id="image"
            label="Blog Image"
            name="image"
            value={newBlogInfo?.image || ""}
            onChange={handleFromChange}
          />
          <FormControl sx={{ width: "95%" }}>
            <InputLabel htmlFor="category-select">
              Select a Category
              <Typography variant="body1" color="textPrimary">
                {selectedCategory !== null ? (
                  <Typography variant="body1" color="textPrimary">
                    {
                      categories.find(
                        (category) => category.id === newBlogInfo.categoryId
                      )?.name
                    }
                  </Typography>
                ) : (
                  ""
                )}
              </Typography>
            </InputLabel>
            <Select
              value={newBlogInfo?.categoryId || ""}
              onChange={handleFromChange}
              name="category"
              labelId="category"
              id="category-select"
            >
              {categories.map((category) => (
                <MenuItem key={category?._id} value={category?._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: "2rem",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
            }}
          >
            <TextField
              required
              sx={{ width: "8rem", marginBottom: "1rem" }}
              id="title"
              label="Title"
              name="title"
              value={newBlogInfo?.title || ""}
              onChange={handleFromChange}
            />
            <TextField
              required
              sx={{ width: "100%" }}
              id="blog"
              label="Blog"
              value={newBlogInfo?.content || ""}
              onChange={handleFromChange}
              name="content"
            />

            <IconButton
              sx={{ color: "#FF7F3E", marginTop: "1.5rem" }}
              type="submit"
              onClick={() => {
                submitBlog();
                navigate("/");
              }}
            >
              Send
              <SendIcon />
            </IconButton>
          </CardContent>
        </Box>
      </Card>

      {isFormValid() && (
        <NewBlogPreview title={title} content={content} image={image} />
      )}
    </Box>
  );
};
export default NewBlogCard;
