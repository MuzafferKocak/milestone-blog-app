import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Logo from "../assets/logo1.png";
import useAuthCalls from "../hooks/useAuthCalls";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
];

const NavBar = ({ setPrefersDarkMode, prefersDarkMode }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleThemeChange = () => {
    setPrefersDarkMode(!prefersDarkMode);
  };

  //* Menüpunkt anklicken: Menü schließen und Seite wechseln
  const goTo = (path) => {
    setAnchorElNav(null);
    setAnchorElUser(null);
    navigate(path);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    navigate("/");
    logout();
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 64 } }}>
          {/* Logo */}
          <Box
            component="img"
            src={Logo}
            alt="logo"
            onClick={() => navigate("/")}
            sx={{ width: 36, height: 36, mr: 2, cursor: "pointer" }}
          />

          {/* Handy: Menü-Symbol */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation"
              aria-controls="menu-nav"
              aria-haspopup="true"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-nav"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navLinks.map((link) => (
                <MenuItem key={link.path} onClick={() => goTo(link.path)}>
                  {link.label}
                </MenuItem>
              ))}
              <MenuItem onClick={() => goTo("/newblog")}>+ New Post</MenuItem>
            </Menu>
          </Box>

          {/* Desktop: Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                onClick={() => navigate(link.path)}
                sx={{
                  color: pathname === link.path ? "text.primary" : "text.secondary",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Desktop: Neuer Beitrag */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/newblog")}
            sx={{ display: { xs: "none", md: "inline-flex" }, mr: 1 }}
          >
            New Post
          </Button>

          {/* Hell/Dunkel-Schalter */}
          <Tooltip title={prefersDarkMode ? "Light mode" : "Dark mode"}>
            <IconButton
              onClick={handleThemeChange}
              aria-label="toggle theme"
              sx={{ color: "text.secondary" }}
            >
              {prefersDarkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Tooltip>

          {/* Avatar mit Menü */}
          <Box sx={{ flexGrow: 0, ml: 1 }}>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar
                  src={user?.image || undefined}
                  alt="avatar"
                  sx={{ width: 34, height: 34 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem onClick={() => goTo("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => goTo("/")}>Home</MenuItem>
              {user ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={() => goTo("/login")}>Login</MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
