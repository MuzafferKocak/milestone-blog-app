import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../assets/logo1.png";
import { Box, Button, Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 640, py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        About
      </Typography>

      <Card>
        <CardContent
          sx={{
            p: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 3,
          }}
        >
          <Box component="img" src={Logo} alt="logo" sx={{ width: 80, height: 80 }} />

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/muzaffer-kocak/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/MuzafferKocak"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
