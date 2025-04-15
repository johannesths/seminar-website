/**
 * AdminDashboard.tsx
 *
 * Displays two tables of all seminars and all locations and allows
 * to manage them. Also allows to create a new seminar or location.
 */

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SeminarTable from "../components/SeminarsTable";
import { useNavigate } from "react-router-dom";
import LocationsTable from "../components/LocationsTable";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCreateSeminar = () => {
    navigate("/admin/create-seminar");
  };

  const handleCreateLocation = () => {
    navigate("/admin/create-location");
  };

  return (
    <Box sx={{ my: 10 }}>
      {/* Seminars */}
      <Typography
        sx={{
          marginTop: 2,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 400,
        }}
      >
        Seminare Übersicht
      </Typography>
      <SeminarTable />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 5,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          color="success"
          onClick={handleCreateSeminar}
        >
          neues Seminar erstellen
        </Button>
      </Box>

      {/* Locations */}
      <Typography
        sx={{
          marginTop: 2,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 400,
        }}
      >
        Standorte Übersicht
      </Typography>
      <LocationsTable />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 5,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          color="success"
          onClick={handleCreateLocation}
        >
          neuen Standort hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
