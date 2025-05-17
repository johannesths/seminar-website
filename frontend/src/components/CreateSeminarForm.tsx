/**
 * CreateSeminarForm.tsx
 *
 * Form in the admin dashboard to create a new seminar.
 */

import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import api from "../api/axios";
import { imageMap } from "./SeminarCard";
import { useLocations } from "../hooks/useLocations";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface SeminarForm {
  title: string;
  description: string;
  date: string;
  time: string;
  url: string;
  price: number;
  max_participants: number;
  image_name: string;
  location_id: number;
}

const initialForm: SeminarForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  url: "",
  price: 0,
  max_participants: 0,
  image_name: "",
  location_id: 0,
};

const CreateSeminarForm = () => {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  // Fetch locations
  const { locations } = useLocations(20);

  // Handle change in input fields
  const handleChange =
    (field: keyof SeminarForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: event.target.value });
    };

  // Handle change in select image
  const handleImageChange =
    (field: keyof SeminarForm) => (event: SelectChangeEvent) => {
      setForm({ ...form, [field]: event.target.value });
    };

  // Handle change in select location
  const handleLocationChange = (event: SelectChangeEvent<number>) => {
    setForm({ ...form, location_id: event.target.value as number });
  };

  // Post new seminar to backend and display success message (or error)
  const handleSubmit = async () => {
    try {
      await api.post("/seminars/", form);
      setSuccess(true);
      setForm(initialForm);
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      alert("Fehler beim Erstellen des Seminars.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, mb: 4 }}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Neues Seminar erstellen
      </Typography>

      {/* Title */}
      <Stack spacing={3}>
        <TextField
          label="Titel"
          value={form.title}
          onChange={handleChange("title")}
          fullWidth
        />

        {/* Description */}
        <TextField
          label="Beschreibung"
          value={form.description}
          onChange={handleChange("description")}
          fullWidth
          multiline
          rows={5}
        />

        {/* Date */}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <DatePicker
            label="Datum"
            value={form.date ? dayjs(form.date) : null}
            onChange={(newDate) => {
              if (newDate) {
                setForm((prev) => ({
                  ...prev,
                  date: newDate.format("YYYY-MM-DD"),
                }));
              }
            }}
          />
        </LocalizationProvider>

        {/* Time (adapted to German format) */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Uhrzeit"
            value={form.time ? dayjs(form.time, "HH:mm") : null}
            onChange={(newValue) => {
              if (newValue) {
                setForm((prev) => ({
                  ...prev,
                  time: newValue.format("HH:mm"),
                }));
              }
            }}
            ampm={false}
          />
        </LocalizationProvider>

        {/* Registration URL for external registration (optional) */}
        <TextField
          label="Anmeldelink (optional)"
          value={form.url}
          onChange={handleChange("url")}
          fullWidth
        />

        {/* Participant limit */}
        <TextField
          label="Teilnehmerlimit"
          type="number"
          value={form.max_participants}
          onChange={handleChange("max_participants")}
        />

        {/* Price */}
        <TextField
          label="Preis (€)"
          type="number"
          value={form.price}
          onChange={handleChange("price")}
        />

        {/* Image for SeminarCard */}
        <FormControl fullWidth>
          <InputLabel id="image-label">Seminarbild</InputLabel>
          <Select
            labelId="image-label"
            value={form.image_name}
            label="Seminarbild"
            onChange={handleImageChange("image_name")}
          >
            {Object.keys(imageMap).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location */}
        <FormControl fullWidth>
          <InputLabel id="location-label">Veranstaltungsort</InputLabel>
          <Select<number>
            labelId="location-label"
            value={form.location_id}
            label="Veranstaltungsort"
            onChange={handleLocationChange}
          >
            {locations.map((location) => (
              <MenuItem key={location.location_id} value={location.location_id}>
                {location.name} – {location.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Create seminar */}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Seminar erstellen
        </Button>

        {/* success message */}
        {success && (
          <Typography textAlign="center" color="success.main">
            Seminar wurde erfolgreich erstellt.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default CreateSeminarForm;
