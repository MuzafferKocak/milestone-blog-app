import { Box, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 6,
        borderTop: 1,
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Copyright © {currentYear} by{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
          MeK
        </Box>
      </Typography>
    </Box>
  );
};

export default Footer;
