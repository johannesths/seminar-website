import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SeperatingLine from "./SeperatingLine";

const schema = z.object({
  name: z.string().min(3, "Name muss mindestens 3 Zeichen enthalten."),
  email: z.string().email("Ungültige E-Mail-Adresse").max(50),
  subject: z.string().max(50, "Betreff darf maximal 50 Zeichen enthalten."),
  message: z
    .string()
    .min(10, "Nachricht muss mindestens 10 Zeichen enthalten.")
    .max(400),
  acceptedTerms: z.boolean().refine((val) => val, {
    message: "Sie müssen die AGB akzeptieren.",
  }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = (data: FormData) => {
    console.log("Form data submitted: ", data);
  };

  return (
    <Box>
      <Toolbar />
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Kontaktformular
      </Typography>
      <SeperatingLine />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={4}
          sx={{
            paddingX: 30,
            paddingY: 5,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            color={errors.name?.message ? "error" : "primary"}
            helperText={
              errors.name?.message && (
                <Typography color="error" variant="subtitle1">
                  Bitte geben Sie Ihren vollständigen Namen an.
                </Typography>
              )
            }
            required
            {...register("name")}
          />
          <TextField
            label="E-Mail"
            type="email"
            variant="outlined"
            color={errors.email?.message ? "error" : "primary"}
            fullWidth
            helperText={
              errors.email?.message && (
                <Typography color="error" variant="subtitle1">
                  Bitte geben Sie eine gültige Email-Adresse an.
                </Typography>
              )
            }
            required
            {...register("email")}
          />
          <TextField
            label="Betreff"
            {...register("subject")}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Nachricht"
            variant="outlined"
            color={errors.message?.message ? "error" : "primary"}
            fullWidth
            multiline
            rows={4}
            helperText={
              errors.message?.message && (
                <Typography color="error" variant="subtitle1">
                  Bitte geben Sie eine Nachricht ein.
                </Typography>
              )
            }
            required
            {...register("message")}
          />
          <FormControlLabel
            control={<Checkbox name="acceptedTerms" />}
            label={
              <Typography>
                Ich akzeptiere die{" "}
                <Link href="/agb" target="_blank" rel="noopener noreferrer">
                  AGB
                </Link>{" "}
                und die{" "}
                <Link
                  href="/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Datenschutzrichtlinien
                </Link>
                .*
              </Typography>
            }
            {...register("acceptedTerms")}
          />
          <Button
            type="submit"
            variant="contained"
            name="submit"
            color="primary"
            size="large"
            endIcon={<SendIcon sx={{ ml: 3 }} />}
            sx={{ padding: 1.5, fontWeight: "bold", width: "20%" }}
            disabled={!isValid}
          >
            Absenden
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Form;
