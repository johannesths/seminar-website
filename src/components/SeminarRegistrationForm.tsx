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
  Box,
  CircularProgress,
} from "@mui/material";
import api from "../api/axios";
import { useState } from "react";

interface Props {
  seminarId: number;
  setStatus: (status: "success" | "error") => void;
}

const [isLoading, setIsLoading] = useState(false);

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

const SeminarRegistrationForm = ({ seminarId, setStatus }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Submit form data to backend
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { priceAcknowledged, ...dataToSend } = data;
      await api.post(`/seminars/${seminarId}/register`, dataToSend);
      setStatus("success");
    } catch (error: any) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box marginTop={2}>
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
                <a
                  href="/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Anmelden"
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SeminarRegistrationForm;
