import * as React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from "../assets/logo1.png"
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";

const About = () => {
  return (
    <Card
      sx={{
        maxWidth: 385,
        height: 280, 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
        margin: "auto",
        marginBottom: "118px",
        marginTop: "4.7rem",
        textAlign: "center",
        
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50px",
            marginBottom: "1.7rem", 
          }}
          image={Logo}
          alt="image"
        />
        <Box sx={{ display: "flex", gap: "2.5rem" }}>
          <Link to="https://www.linkedin.com/in/muzaffer-kocak/" target="_blank">
          <LinkedInIcon sx={{ fontSize: '56px', color: blue[500]  }}/>
          </Link>
          <Link to="https://github.com/MuzafferKocak" target="_blank">

          <GitHubIcon sx={{ fontSize: '50px', color: grey[500] }}/>
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}

export default About