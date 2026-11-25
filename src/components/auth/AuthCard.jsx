import { Box, Card, CardContent, Typography } from "@mui/material";

//* Gemeinsamer Rahmen für Login und Registrieren
const AuthCard = ({ title, subtitle, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "flex-start", sm: "center" },
        px: 2,
        py: { xs: 4, md: 8 },
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" sx={{ mt: 0.5, mb: 1 }}>
              {subtitle}
            </Typography>
          )}
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthCard;
