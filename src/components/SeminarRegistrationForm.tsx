/**
 * SeminarRegistrationForm.tsx
 *
 * Displays a form to register for a seminar.
 * Pops up when you click the "Anmeldung" button on a seminar card.
 */

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  Stack,
  FormControlLabel,
} from "@mui/material";
import api from "../api/axios";
import { useState } from "react";

// Schema for the form, conditions for the form fields
const schema = z.object({
  firstname: z.string().min(2, "Bitte geben Sie Ihren Vornamen an."),
  lastname: z.string().min(2, "Bitte geben Sie Ihren Nachnamen an."),
  email: z.string().email("Bitte geben Sie eine korrekte Email-Adresse an."),
  remarks: z.string().optional(),
  priceAcknowledged: z.boolean().refine((val) => val, {
    message: "Bitte akzeptieren Sie die Geschäftsbedingungen.",
  }),
});

type FormData = z.infer<typeof schema>;

const SeminarRegistrationForm = ({ seminarId }: { seminarId: number }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Submit form data to backend
  const onSubmit = async (data: FormData) => {
    try {
      const { priceAcknowledged, ...dataToSend } = data;
      console.log(dataToSend);
      await api.post(`/seminars/${seminarId}/register`, dataToSend);
      setSuccess(
        "Sie haben sich erfolgreich angemeldet. Sie erhalten eine Bestätigung mit weiteren Informationen per Email."
      );
      setError(null);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          "Die Registrierung ist fehlgeschlagen. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns über das Kontaktformular."
      );
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Firstname */}
        <TextField
          label="Vorname"
          {...register("firstname")}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          fullWidth
        />

        {/* Lastname */}
        <TextField
          label="Nachname"
          {...register("lastname")}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          fullWidth
        />

        {/* Email */}
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        {/* Remarks (optional) */}
        <TextField
          label="Anmerkungen (optional)"
          {...register("remarks")}
          multiline
          rows={4}
          fullWidth
        />

        {/* Checkbox for accepting the AGB and Datenschutz */}
        <FormControlLabel
          control={<Checkbox {...register("priceAcknowledged")} />}
          label={
            <Typography>
              Ich habe die{" "}
              <a href="/agb" target="_blank" rel="noopener noreferrer">
                AGB
              </a>{" "}
              und die{" "}
              <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
                Datenschutzinformationen
              </a>{" "}
              gelesen und akzeptiere diese.
            </Typography>
          }
        />

        {/* Error message */}
        {errors.priceAcknowledged && (
          <Typography color="error">
            {errors.priceAcknowledged.message}
          </Typography>
        )}

        {/* Submit button */}
        <Button type="submit" variant="contained" disabled={!isValid}>
          Anmelden
        </Button>
        {success && <Typography color="success.main">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Stack>
    </form>
  );
};

export default SeminarRegistrationForm;
