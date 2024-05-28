import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Logo from "../assets/logo1.png"

const NavBar = ({ setPrefersDarkMode, prefersDarkMode }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleThemeChange = () => {
    setPrefersDarkMode(!prefersDarkMode);
  };
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{ backgroundColor: !prefersDarkMode ? "#a7adba" : "" }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            style={{ width: "3.5rem", height: "3.5rem", marginRight: "2rem", borderRadius: "50px" }}
            src={Logo}
            alt="logo"
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button onClick={() => navigate("/")}>Dashboard</Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button onClick={() => navigate("/newblog")}>New Blog</Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button onClick={() => navigate("/about")}>About</Button>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button onClick={() => navigate("/")}>Dashboard</Button>
            <Button onClick={() => navigate("/newblog")}>New Blog</Button>
            <Button onClick={() => navigate("/about")}>About</Button>
          </Box>
          <Box sx={{ marginRight: "1.5rem" }}>
            <Tooltip
              title="Theme"
              variant="contained"
              sx={{ width: "20px", height: "20px" }}
              onClick={handleThemeChange}
            >
              <IconButton>
                <WbSunnyIcon sx={{ width: "1.2rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {currentUser && currentUser.image ? (
                  <Avatar src={currentUser.image} alt="avatar" />
                ) : (
                  <Avatar></Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={() => navigate("/profile")} textAlign="center">
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={() => navigate("/")} textAlign="center">
                  Dashboard
                </Typography>
              </MenuItem>
              {currentUser ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={() => navigate("/logout")} textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={() => navigate("/login")} textAlign="center">
                    Login
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;