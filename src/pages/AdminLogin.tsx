import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { TextField, Button, Typography, Stack } from "@mui/material";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/token", { username, password });
      navigate("/admin/dashboard"); // redirect to dashboard
    } catch {
      setError("Login fehlgeschlagen. Bitte prüfen Sie Ihre Daten.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={2} sx={{ maxWidth: 300, margin: "auto", mt: 8 }}>
        <Typography variant="h5">Admin Login</Typography>
        <TextField
          label="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default AdminLogin;
