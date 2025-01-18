import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux"

const ProfileDetail = () => {
  const userState = useSelector((state) => state.auth)
  const currentUser = userState.user
//   console.log(userState);
//   console.log(currentUser);

  return (
    <Card sx={{ maxWidth: "700px", margin: "0 auto" }}>
      <CardHeader
        sx={{ color: "#bd0e0e" }}
        avatar={
          <Avatar
            sx={{ width: "6rem", height: "6rem" }}
            src={currentUser?.image}
          />
        }
        title={
          <Typography variant="h4" component="div">
            {currentUser?.firstName} {currentUser?.lastName}
          </Typography>
        }
        subheader={
          <Typography variant="h5" color="text.secondary">
            {currentUser?.username}
          </Typography>
        }
      />
      <CardContent sx={{ color: "#FF6969" }}>
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Username:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">{currentUser?.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Email:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">{currentUser?.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="text.secondary">
              First Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">{currentUser?.firstName}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Last Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">{currentUser?.lastName}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="text.secondary">
              Biography:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="body1">{currentUser?.bio}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProfileDetail