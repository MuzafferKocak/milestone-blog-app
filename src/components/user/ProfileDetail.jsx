import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

const ProfileDetail = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const fields = [
    { label: "Username", value: currentUser?.username },
    { label: "Email", value: currentUser?.email },
    { label: "First name", value: currentUser?.firstName },
    { label: "Last name", value: currentUser?.lastName },
    { label: "Biography", value: currentUser?.bio },
  ];

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          <Avatar src={currentUser?.image} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography variant="h5">
              {currentUser?.firstName} {currentUser?.lastName}
            </Typography>
            <Typography color="text.secondary">@{currentUser?.username}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          component="dl"
          sx={{
            m: 0,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" },
            rowGap: { xs: 0.5, sm: 2 },
            columnGap: 2,
          }}
        >
          {fields.map((field) => (
            <Box key={field.label} sx={{ display: "contents" }}>
              <Typography component="dt" variant="body2" color="text.secondary">
                {field.label}
              </Typography>
              <Typography component="dd" variant="body1" sx={{ m: 0, mb: { xs: 1.5, sm: 0 } }}>
                {field.value || "–"}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileDetail;
