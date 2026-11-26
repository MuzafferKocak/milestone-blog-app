import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";

//* Bearbeiten-Formular: startet mit den aktuellen Werten des Blogs
const UpdateModal = ({ openUpdate, handleCloseUpdate, blog, id }) => {
  const { getCategories, updateBlog } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);

  const [info, setInfo] = useState({
    title: blog?.title || "",
    image: blog?.image || "",
    //* categoryId kann ein Objekt (mit Namen) oder nur die ID sein
    categoryId: blog?.categoryId?._id || blog?.categoryId || "",
    content: blog?.content || "",
    status: blog?.status || "p",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!categories?.length) getCategories("categories");
  }, []); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const canSave = info.title.trim() && info.content.trim() && !saving;

  const handleSave = async () => {
    setSaving(true);
    const ok = await updateBlog(id, info);
    setSaving(false);
    if (ok) handleCloseUpdate();
  };

  return (
    <Dialog
      open={openUpdate}
      onClose={handleCloseUpdate}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { border: 1, borderColor: "divider" } }}
      aria-labelledby="update-dialog-title"
    >
      <DialogTitle id="update-dialog-title">Edit post</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: "8px !important" }}
      >
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          value={info.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="image"
          placeholder="https://..."
          value={info.image}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="update-category-label">Category</InputLabel>
          <Select
            labelId="update-category-label"
            label="Category"
            name="categoryId"
            value={categories?.length ? info.categoryId : ""}
            onChange={handleChange}
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
          //* feste Höhe statt mitwachsen: verhindert den ResizeObserver-Fehler im Fenster
          rows={10}
          label="Content"
          name="content"
          value={info.content}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Switch
              checked={info.status === "p"}
              onChange={(e) =>
                setInfo({ ...info, status: e.target.checked ? "p" : "d" })
              }
            />
          }
          label={info.status === "p" ? "Published" : "Draft"}
          sx={{ color: "text.secondary" }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={handleCloseUpdate} disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} disabled={!canSave}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
