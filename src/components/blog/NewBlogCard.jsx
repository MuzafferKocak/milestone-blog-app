import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
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
    categoryId: "",
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
    if (name === "category") {
      setSelectedCategory(value);
      setNewBlogInfo({ ...newBlogInfo, categoryId: value }); // Değişiklik: categoryId'ye value atanıyor
    } else {
      setNewBlogInfo({ ...newBlogInfo, [name]: value });
    }
  };

  const submitBlog = () => {
    getNewBlogCreate("blogs", newBlogInfo);
    getPostData("blogs");
    console.log("New Blog eklendi", newBlogInfo);
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
      <Box sx={{ maxWidth: 345, minWidth: "22rem", marginRight: "5rem", height:"455px" }}>
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
          <Button
            sx={{ marginLeft: "8rem" }}
            type="submit"
            onClick={() => {
              submitBlog();
              navigate("/");
            }}
          >
            <SendIcon sx={{ color: "#ffb600" }} />
          </Button>
          
        </Card>
      </Box>
      <NewBlogPreview title={title} content={content} image={image} />
    </Box>
  );
};
export default NewBlogCard;
