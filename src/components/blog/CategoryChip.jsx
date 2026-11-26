import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";

//* Kleines Kategorie-Etikett in Akzentfarbe. Ohne Namen wird nichts angezeigt.
const CategoryChip = ({ name }) => {
  if (!name) return null;

  return (
    <Chip
      label={name}
      size="small"
      sx={{
        color: "primary.main",
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.14),
      }}
    />
  );
};

export default CategoryChip;
