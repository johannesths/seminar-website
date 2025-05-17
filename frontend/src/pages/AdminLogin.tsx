/**
 * AdminLogin.tsx
 *
 * Simple login form with username and password to access the admin area.
 * Redirects the user to the admin dashboard on successful login.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { TextField, Button, Typography, Stack } from "@mui/material";
import { useEffect } from "react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lockedOutUntil = localStorage.getItem("lockedOutUntil");
    if (lockedOutUntil && new Date(lockedOutUntil) > new Date()) {
      setRateLimited(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/token", { username, password });
      navigate("/admin/dashboard"); // redirect to dashboard
    } catch (err: any) {
      // Lock out user from trying to sign in again for one hour
      // LockedOutTime is stored in local storage so it is not hard to delete but creates an obstacle
      if (err.response?.status === 429) {
        const now = new Date();
        const lockoutTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
        localStorage.setItem("lockedOutUntil", lockoutTime.toISOString());
        setRateLimited(true);
        setError("Zu viele fehlgeschlagene Loginversuche.");
      } else {
        setError("Login fehlgeschlagen. Bitte prüfen Sie Ihre Daten.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={2} sx={{ maxWidth: 300, margin: "auto", mt: 8 }}>
        <Typography variant="h5">Admin Login</Typography>
        {/* Username */}
        <TextField
          label="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error message */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Login Button */}
        <Button variant="contained" type="submit" disabled={rateLimited}>
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default AdminLogin;
