/**
 * EditLocationForm.tsx
 *
 * Displays a form to edit an exisiting location and submits changes
 * to the backend.
 */

import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export interface LocationForm {
  name: string;
  street: string;
  house_number: string;
  zip_code: number;
  city: string;
  remarks?: string;
  maps_url?: string;
}

const EditLocationForm = () => {
  // extract location_id from URl
  const { id } = useParams();
  const locationId = Number(id);

  // States
  const [location, setLocation] = useState<LocationForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [putError, setPutError] = useState(false);

  const navigate = useNavigate();

  // Fetch seminar
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await api.get(`/location/${locationId}`);
        setLocation(response.data);
      } catch (error) {
        console.error("Fehler beim Laden des Standorts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, [locationId]);

  // Handle text field change in the form
  const handleChange =
    (field: keyof LocationForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocation((prev) => prev && { ...prev, [field]: event.target.value });
    };

  // Handle saving changes, confirmation required, shows success message
  const handleSave = async () => {
    const confirm = window.confirm(
      "Möchten Sie die Änderungen sicher speichern?"
    );
    if (!confirm) return;

    try {
      await api.put(`/locations/${locationId}`, location);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      setPutError(true);
      setTimeout(() => setPutError(false), 6000);
      console.error("Fehler beim Speichern:", error);
    }
  };

  // Show spinner while loading
  if (loading || !location)
    return (
      <CircularProgress
        sx={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          m: "0 auto",
        }}
      />
    );

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Standort bearbeiten
      </Typography>

      {/* Name */}
      <Stack spacing={3}>
        <TextField
          label="Name"
          value={location.name}
          onChange={handleChange("name")}
          fullWidth
        />

        {/* Zip code */}
        <TextField
          label="PLZ"
          type="number"
          value={location.zip_code}
          onChange={handleChange("zip_code")}
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
          value={location.remarks || ""}
          onChange={handleChange("remarks")}
          fullWidth
        />

        {/* Google Maps URL (optional) */}
        <TextField
          label="Google Maps URL (optional)"
          value={location.maps_url || ""}
          onChange={handleChange("maps_url")}
          fullWidth
        />

        {/* Save changes */}
        <Button variant="contained" onClick={handleSave} disabled={loading}>
          Änderungen speichern
        </Button>

        {/* Success message */}
        {success && (
          <Typography color="success.main">
            Änderungen erfolgreich gespeichert.
          </Typography>
        )}

        {/* Error message */}
        {putError && (
          <Typography color="error">
            Es ist ein Fehler aufgetreten. Haben Sie das Formular vollständig
            ausgefüllt?
          </Typography>
        )}

        {/* Return to dashboard */}
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate("/admin/dashboard")}
        >
          zurück zum Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default EditLocationForm;
