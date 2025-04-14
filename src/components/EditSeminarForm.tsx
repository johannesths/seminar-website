/**
 * EditSeminarForm.tsx
 *
 * Allows the administrator to edit the information of a specified seminar.
 * It fetches the seminar data from the backend, displays
 * a form with pre-filled values and submits updates via PUT request.
 */

import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Stack,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import dayjs from "dayjs";
import { imageMap } from "./SeminarCard";
import { useLocations, Location } from "../hooks/useLocations";
export interface SeminarForm {
  title: string;
  description: string;
  date: string;
  time: string;
  url: string;
  price: number;
  max_participants: number;
  image_name: string;
  location: Location;
}

const EditSeminarForm = () => {
  // seminar_id from URL
  const { id } = useParams();
  const seminarId = Number(id);
  const [seminar, setSeminar] = useState<SeminarForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Fetch locations for select menu
  const { locations } = useLocations(20);

  // Fetch seminar by id
  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        const response = await api.get(`/seminar/${seminarId}`);
        setSeminar(response.data);
      } catch (error) {
        console.error("Fehler beim Laden des Seminars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeminar();
  }, [seminarId]);

  // Handle changes in the textfields
  const handleTextChange =
    (field: keyof SeminarForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSeminar((prev) => prev && { ...prev, [field]: event.target.value });
    };

  // Handle select changes for image_name
  const handleImageChange =
    (field: keyof SeminarForm) => (event: SelectChangeEvent) => {
      setSeminar(
        (prev) => prev && { ...prev, [field]: event.target.value as string }
      );
    };
  // Handle select changes for location_id
  const handleLocationChange = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    setSeminar((prev) => prev && { ...prev, location_id: selectedId });
  };

  // Confirm changes and post updated seminar to backend
  const handleSave = async () => {
    const confirm = window.confirm(
      "Möchten Sie die Änderungen sicher speichern?"
    );
    if (!confirm) return;

    try {
      await api.put(`/seminars/${seminarId}`, seminar);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  // Show loading spinner while fetching the seminar
  if (loading || !seminar)
    return (
      <CircularProgress
        sx={{ display: "flex", alignContent: "center", alignItems: "center" }}
      />
    );

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: 8,
          textAlign: "center",
          fontSize: 25,
          fontWeight: 500,
        }}
      >
        Seminar bearbeiten
      </Typography>

      <Stack spacing={3}>
        {/* Title */}
        <TextField
          label="Titel"
          value={seminar.title}
          onChange={handleTextChange("title")}
          fullWidth
        />

        {/* Description */}
        <TextField
          label="Beschreibung"
          value={seminar.description}
          onChange={handleTextChange("description")}
          fullWidth
          multiline
          rows={6}
        />

        {/* Date */}
        <TextField
          label="Datum"
          type="date"
          value={dayjs(seminar.date).format("YYYY-MM-DD")}
          onChange={handleTextChange("date")}
          InputLabelProps={{ shrink: true }}
        />

        {/* Time */}
        <TextField
          label="Uhrzeit"
          type="time"
          value={seminar.time}
          onChange={handleTextChange("time")}
          InputLabelProps={{ shrink: true }}
        />

        {/* Registration URL for external registration sites (optional) */}
        <TextField
          label="Anmeldelink (optional)"
          value={seminar.url || ""}
          onChange={handleTextChange("url")}
          fullWidth
        />

        {/* Max participants */}
        <TextField
          label="Teilnehmerlimit"
          type="number"
          value={seminar.max_participants}
          onChange={handleTextChange("max_participants")}
        />

        {/* Price */}
        <TextField
          label="Preis (€)"
          type="number"
          value={seminar.price}
          onChange={handleTextChange("price")}
        />

        {/* Image selection field */}
        <FormControl fullWidth>
          <InputLabel id="image-label">Seminarbild</InputLabel>
          <Select
            labelId="image-label"
            value={seminar.image_name}
            label="Seminarbild"
            onChange={handleImageChange("image_name")}
          >
            {Object.keys(imageMap).map((imageKey) => (
              <MenuItem key={imageKey} value={imageKey}>
                {imageKey}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location selection field */}
        <FormControl fullWidth>
          <InputLabel id="location-label">Veranstaltungsort</InputLabel>
          <Select<number>
            labelId="location-label"
            value={seminar.location.location_id}
            label="Veranstaltungsort"
            onChange={handleLocationChange}
          >
            {locations.map((location) => (
              <MenuItem key={location.location_id} value={location.location_id}>
                {location.name} - {location.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Save changes  */}
        <Button variant="contained" onClick={handleSave}>
          Änderungen speichern
        </Button>

        {/* Sucess message */}
        {success && (
          <Typography color="success.main">
            Änderungen erfolgreich gespeichert.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default EditSeminarForm;
