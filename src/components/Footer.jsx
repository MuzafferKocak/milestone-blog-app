import { Box, Typography } from "@mui/material";



const Footer = ({ prefersDarkMode }) => {
    
    
    
  return (
    <Box
      py={3}
      sx={{
        backgroundColor: !prefersDarkMode ? "#a7adba" : "#292929" ,
        position: "fixed",
        bottom: 0,
        width: "100%", 
        textAlign: "center",
      }}
    >
      <Typography sx={{ color: prefersDarkMode ? "gray" : "black" }} fontSize={"14px"}>
        Copyright © 2024 by{" "}
        <span style={{ color: prefersDarkMode ? "#90caf9" : "black" }}>
          MeK
        </span>
      </Typography>
    </Box>
  );
};

export default Footer;