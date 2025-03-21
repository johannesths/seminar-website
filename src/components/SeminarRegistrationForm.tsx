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

  const onSubmit = async (data: FormData) => {
    try {
      await api.post(`/seminars/${seminarId}/register`, data);
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
        <TextField
          label="Vorname"
          {...register("firstname")}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
          fullWidth
        />
        <TextField
          label="Nachname"
          {...register("lastname")}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
          fullWidth
        />
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Anmerkungen (optional)"
          {...register("remarks")}
          multiline
          rows={4}
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox {...register("priceAcknowledged")} />}
          label="Hiermit bestätige ich meine Anmeldung und den mit der Teilnahme verbundenen Bedingungen." // Need to actually put the conditions somewhere
        />
        {errors.priceAcknowledged && (
          <Typography color="error">
            {errors.priceAcknowledged.message}
          </Typography>
        )}
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
