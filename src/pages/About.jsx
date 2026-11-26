import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../assets/logo1.png";
import { Box, Button, Chip, Container, Divider, Typography } from "@mui/material";

const FEATURES = [
  "Register and log in",
  "Write, edit and delete your own posts",
  "Like and comment on posts",
  "Browse by category, switch dark/light mode",
];

const TECH_STACK = [
  "React",
  "Redux Toolkit",
  "Material UI",
  "Formik/Yup",
  "Node.js",
  "Express",
  "MongoDB",
  "Mongoose",
  "Vercel",
];

const About = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 640, py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        About
      </Typography>

      <Card>
        <CardContent
          sx={{ p: { xs: 3, sm: 4 }, display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Vorstellung */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={Logo}
              alt="logo"
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
              Hi, I'm Muzaffer.
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              I'm a developer. This blog is a full-stack project built with React
              and Node.js – from the user interface to the API and the database.
            </Typography>
          </Box>

          <Divider />

          {/* Funktionen */}
          <Box>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              What you can do here
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.secondary", lineHeight: 1.8 }}>
              {FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </Box>
          </Box>

          {/* Technik */}
          <Box>
            <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
              Built with
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {TECH_STACK.map((tech) => (
                <Chip key={tech} label={tech} variant="outlined" size="small" />
              ))}
            </Box>
          </Box>

          <Divider />

          {/* Links */}
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
