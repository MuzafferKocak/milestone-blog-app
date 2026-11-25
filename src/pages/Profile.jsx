import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ProfileDetail from "../components/user/ProfileDetail";

const Profile = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 640, py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Your account details.
        </Typography>
      </Box>
      <ProfileDetail />
    </Container>
  );
};

export default Profile;
