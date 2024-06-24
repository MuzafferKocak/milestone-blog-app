import { Box, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

const Footer = ({ prefersDarkMode }) => {
  return (
    <Box
      py={3}
      sx={{
        backgroundColor: !prefersDarkMode ? "#C7C8CC" : "#292929",
        position: "fixed",
        
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ color: prefersDarkMode ? "grey" : "black" }}
        fontSize={"14px"}
      >
        Copyright © {currentYear} by{" "}
        <span style={{ color: prefersDarkMode ? "#90caf9" : "#6a88d8" }}>
          MeK
        </span>
      </Typography>
    </Box>
  );
};

export default Footer;
