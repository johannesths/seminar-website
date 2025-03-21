import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

const NavBar = () => {
  const pages = ["Angebote", "Veranstaltungen", "Profil", "Kontakt"];
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation(); // Current path

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Ursula Trahasch
      </Typography>
      <List>
        <ListItem key="home">
          <ListItemButton
            component={Link}
            to={"/"}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {pages.map((page) => (
          <ListItem key={page}>
            <ListItemButton
              component={Link}
              to={`/${page.toLowerCase()}`}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        paddingX: { xs: 1, md: 4 },
        margin: 0,
        width: "100%",
        backgroundColor: "#02a4c4",
      }}
    >
      <Toolbar>
        {/* Logo and Title */}
        <Button component={Link} to="/" sx={{ margin: 0, padding: 0 }}>
          <img
            src={logoImage}
            alt="Logo"
            style={{
              maxHeight: "60px",
              width: "auto",
              objectFit: "contain",
              margin: 14,
              padding: 3,
              backgroundColor: "#bee3eb",
              borderRadius: "50%",
            }}
          />
        </Button>
        <Stack sx={{ flexGrow: 1, alignItems: "flex-start" }}>
          <Typography variant="h5">Ursula Trahasch</Typography>
          <Typography variant="subtitle1">
            Beratung | Coaching | Supervision | Weiterbildung
          </Typography>
        </Stack>

        {/* Desktop Navigation */}
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 5 }}
          justifyContent="flex-end"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {location.pathname !== "/" && (
          <Button component={Link} to="/" sx={{ my: 2, color: "white" }}>
            Startseite
          </Button>
          )}
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={`/${page.toLowerCase()}`}
              variant="text"
              sx={{ my: 2, color: "white" }}
            >
              {page}
            </Button>
          ))}
        </Stack>

        {/* Mobile Hamburger Menu */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          textAlign: "center",
          width: "100%", // Prevent overflow
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
