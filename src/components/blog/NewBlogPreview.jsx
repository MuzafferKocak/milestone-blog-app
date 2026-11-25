import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import CategoryChip from "./CategoryChip";

const NewBlogPreview = ({ content, title, image, category }) => {
  const userInfo = useSelector((state) => state.auth.user);

  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Box sx={{ position: { md: "sticky" }, top: { md: 88 } }}>
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ display: "block", mb: 1, letterSpacing: 1 }}
      >
        Preview
      </Typography>
      <Card>
        {image ? (
          <CardMedia
            component="img"
            src={image}
            alt="preview"
            sx={{ height: 180, objectFit: "cover" }}
          />
        ) : (
          <Box sx={{ height: 180, bgcolor: "divider" }} />
        )}
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <CategoryChip name={category} />
            <Typography variant="caption" color="text.secondary">
              {userInfo?.username ? `${userInfo.username} · ${date}` : date}
            </Typography>
          </Box>
          <Typography variant="h6" component="h2" sx={{ lineHeight: 1.3, overflowWrap: "anywhere" }}>
            {title || "Your post title"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflowWrap: "anywhere",
              whiteSpace: "pre-line",
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {content || "Start writing and your text will appear here."}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewBlogPreview;
