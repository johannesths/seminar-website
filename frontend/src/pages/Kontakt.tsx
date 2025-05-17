/**
 * Kontakt.tsx
 *
 * Page that displays ContactForm.tsx and additional contact information.
 */

import { Typography, Link, Stack, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ContactForm from "../components/ContactForm";

const Kontakt = () => {
  return (
    <>
      {/* Contact Form */}
      <ContactForm />

      <Box sx={{ fontSize: 20, mb: 5 }}>
        <Typography
          sx={{
            marginTop: 2,
            textAlign: "center",
            lineHeight: 1.8,
            fontWeight: 400,
            fontSize: "inherit",
          }}
        >
          Alternativ erreichen Sie mich telefonisch oder per Email:
        </Typography>

        <Stack direction="column" spacing={2} alignItems="center" m={2}>
          {/* Mobile */}
          <Link
            href="tel:+4915234204344"
            underline="hover"
            color="secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "inherit",
            }}
          >
            <PhoneIcon /> 0152 3420 4344
          </Link>

          {/* Email */}
          <Link
            href="mailto:kontakt@ursula-trahasch.de"
            underline="hover"
            color="secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "inherit",
            }}
          >
            <EmailIcon /> kontakt@ursula-trahasch.de
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default Kontakt;
