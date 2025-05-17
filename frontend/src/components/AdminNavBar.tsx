/**
 * AdminNavBar.tsx
 *
 * This NavBar is displayed in the admin area.
 * Allows to go back to the admin dashboard, the index page or logout.
 */

import {
  Alert,
  AppBar,
  Button,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import api from "../api/axios";
import { useState } from "react";

const AdminNavBar = () => {
  const navigate = useNavigate();

  // Pages shown in the NavBar
  const pages = [
    { title: "Startseite", url: "/" },
    { title: "Dashboard", url: "/admin/dashboard" },
  ];

  const [logoutSuccess, setLogoutSuccess] = useState(false);

  // Send logout request to backend and show success message
  const handleLogout = async () => {
    try {
      await api.post("/admin/logout");
      setLogoutSuccess(true);
      setTimeout(() => {
        setLogoutSuccess(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          paddingX: { xs: 1, md: 4 },
          margin: 0,
          width: "100%",
          backgroundColor: "#02a4c4",
        }}
      >
        <Toolbar sx={{ minHeight: 90 }}>
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

          {/* Navigation */}
          <Stack
            direction="row"
            spacing={{ xs: 2, md: 5 }}
            justifyContent="flex-end"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.url}
                variant="text"
                sx={{ my: 2, color: "white" }}
              >
                {page.title}
              </Button>
            ))}
            {/* Logout */}
            <Button
              key="logout"
              variant="text"
              sx={{ my: 2, color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Logout success message */}
      <Snackbar
        open={logoutSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Erfolgreich ausgeloggt.
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminNavBar;
