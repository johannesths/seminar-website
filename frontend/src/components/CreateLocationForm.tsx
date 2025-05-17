/**
 * CreateLocationForm.tsx
 *
 * Form to create a new location and send it to the backend.
 */

import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface LocationForm {
  name: string;
  street: string;
  house_number: string;
  zip_code: number;
  city: string;
  remarks?: string;
  maps_url?: string;
}

const CreateLocationForm = () => {
  // Empty form
  const [location, setLocation] = useState<LocationForm>({
    name: "",
    street: "",
    house_number: "",
    zip_code: 0,
    city: "",
    remarks: "",
    maps_url: "",
  });

  // States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Handle change of input fields
  const handleChange =
    (field: keyof LocationForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocation((prev) => ({
        ...prev,
        [field]:
          field === "zip_code"
            ? Number(event.target.value)
            : event.target.value,
      }));
    };

  // Handle submit of form, confirmation required, shows success message
  const handleSubmit = async () => {
    const confirm = window.confirm("Möchten Sie diesen Standort hinzufügen?");
    if (!confirm) return;

    setLoading(true);
    try {
      await api.post("/locations/", location);
      setSuccess(true);
      setLocation({
        name: "",
        street: "",
        house_number: "",
        zip_code: 0,
        city: "",
        remarks: "",
        maps_url: "",
      });
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.error("Fehler beim Erstellen des Standorts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Neuen Standort hinzufügen
      </Typography>

      <Stack spacing={3}>
        {/* Name */}
        <TextField
          label="Name"
          value={location.name}
          onChange={handleChange("name")}
          fullWidth
          required
        />

        {/* Zip code */}
        <TextField
          label="Postleitzahl"
          type="number"
          value={location.zip_code || ""}
          onChange={handleChange("zip_code")}
          fullWidth
        />

        {/* City */}
        <TextField
          label="Stadt"
          value={location.city}
          onChange={handleChange("city")}
          fullWidth
        />

        {/* Street */}
        <TextField
          label="Straße"
          value={location.street}
          onChange={handleChange("street")}
          fullWidth
        />

        {/* House number */}
        <TextField
          label="Hausnummer"
          value={location.house_number}
          onChange={handleChange("house_number")}
          fullWidth
        />

        {/* Remarks (optional) */}
        <TextField
          label="Anmerkungen (optional)"
          value={location.remarks}
          onChange={handleChange("remarks")}
          fullWidth
        />

        {/* Google Maps URL (optional) */}
        <TextField
          label="Google Maps URL (optional)"
          value={location.maps_url}
          onChange={handleChange("maps_url")}
          fullWidth
        />

        {/* Save button */}
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Standort speichern"}
        </Button>

        {/* Success message */}
        {success && (
          <Typography color="success.main">
            Standort erfolgreich erstellt!
          </Typography>
        )}

        {/* Return to dashboard */}
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate("/admin/dashboard")}
        >
          Abbrechen / zurück zum Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateLocationForm;
