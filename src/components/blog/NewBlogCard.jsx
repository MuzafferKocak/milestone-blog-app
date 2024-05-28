import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ForumIcon from "@mui/icons-material/Forum";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  FormControl,
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
    category: "",
    status: "p",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const { title, content, image } = newBlogInfo; // eslint-disable-lin

  //   const userInfo = useSelector((state) => state.auth.currentUser)

  const { getCategories, getNewBlogCreate, getPostData } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);
  console.log(categories);

  useEffect(() => {
    getCategories("categories");
    console.log("Categories", categories);
  }, []); // eslint-disable-line

  const handleFromChange = (e) => {
    const { name, value } = e.target;
    // console.log("Name:", name);
    // console.log("Value:", value);
    if (name === "category") {
      setSelectedCategory(value);
    }
    setNewBlogInfo({ ...newBlogInfo, [name]: value });
  };

  const submitBlog = () => {
    getNewBlogCreate("blogs", newBlogInfo);
    getPostData("blogs");
    console.log("Fetching data...", newBlogInfo);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Box sx={{ maxWidth: 345, minWidth: "22rem", marginRight: "5rem" }}>
        <Card>
          <CardHeader
            avatar={<Avatar src={image} aria-label="recipe"></Avatar>}
            action={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SaveAsIcon sx={{ color: "aquamarine" }} />
                <Switch
                  checked={newBlogInfo.status === "p"}
                  onChange={(e) =>
                    setNewBlogInfo({
                      ...newBlogInfo,
                      status: e.target.checked ? "p" : "d",
                    })
                  }
                />
                <SendIcon sx={{ color: "#ffb600" }} />
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
              gap: 2,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="image"
              label="Blog Image"
              name="image"
              value={newBlogInfo?.image || ""}
              onChange={handleFromChange}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="category-select">
                Select a Category
                <Typography variant="body1" color="textPrimary">
                  {selectedCategory !== null ? (
                    <Typography variant="body1" color="textPrimary">
                      {
                        categories.find(
                          (category) => category.id === newBlogInfo.category
                        )?.name
                      }
                    </Typography>
                  ) : (
                    "Select a Category"
                  )}
                </Typography>
              </InputLabel>
              <Select
                value={newBlogInfo?.category || ""}
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
          <Box sx={{ display: "flex", alignItems: "center" }}></Box>
          <CardContent>
            <TextField
              required
              sx={{ width: "5rem" }}
              id="title"
              label="Title"
              name="content"
              value={newBlogInfo?.content || ""}
              onChange={handleFromChange}
            />
            <Box
              sx={{ height: "4rem", marginTop: "1rem" }}
              variant="body2"
              color="text.secondary"
            >
              <TextField
                required
                fullWidth
                id="blog"
                label="Blog"
                value={newBlogInfo?.title || ""}
                onChange={handleFromChange}
                name="title"
              />
            </Box>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon sx={{ color: "red" }} />
            </IconButton>
            <Typography>5+</Typography>
            <IconButton aria-label="add to favorites">
              <ForumIcon sx={{ color: "orange" }} />
            </IconButton>
            <Typography>9+</Typography>
            <IconButton aria-label="add to favorites">
              <RemoveRedEyeIcon sx={{ color: "#07aaea" }} />
            </IconButton>
            <Typography>9+</Typography>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Button
              sx={{ marginLeft: "3rem" }}
              type="submit"
              onClick={() => {
                submitBlog();
                navigate("/");
              }}
            >
              <SendIcon sx={{ color: "#ffb600" }} />
            </Button>
          </CardActions>
        </Card>
      </Box>
      <NewBlogPreview title={title} content={content} image={image} />
    </Box>
  );
};
export default NewBlogCard;
