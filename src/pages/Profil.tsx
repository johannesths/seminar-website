/**
 * Profil.tsx
 *
 * Displays information about the business owner including
 * CV, further training.
 *
 * Sections:
 * - Full width blurred image with an overlay.
 * - CV displayed as a timeline.
 * - Further trainings displayed as a list.
 * - Memberships in associations.
 * - Grid with potential problems that the admin can help with.
 * - Buttons to navigate to relevant other pages.
 */

import { Box, Stack, Typography, Divider, Button } from "@mui/material";
import ImageBox from "../components/ImageBox";
import fahrradImage from "../assets/ursula-fahrrad-adria.jpg";
import CV from "../components/CV";
import Weiterbildungen from "../components/Weiterbildungen";
import profilePicture from "../assets/Ursula-Trahasch-2024.jpg";
import CardGrid from "../components/CardGrid";
import { problems } from "../data/Probleme";
import { Link } from "react-router-dom";
import LogosDisplay from "../components/LogosDisplay";
import Heading from "../components/Heading";

const Profil = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around",
        overflowX: "hidden",
        padding: 0,
      }}
    >
      {/* ImageBox */}
      <ImageBox blur={true} semiTransparentOverlay={false} image={fahrradImage}>
        {/* Text */}
        <Box
          sx={{
            minWidth: { xs: "100%", md: "60%" },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", sm: "2.9rem" },
            }}
          >
            Ursula Trahasch
          </Typography>
          <Divider
            sx={{
              width: { xs: "80%", md: "100%" },
              marginY: "1rem",
              borderColor: "rgba(255, 255, 255, 0.5)",
              marginX: { xs: "auto", md: "0" },
            }}
          />
          <Typography
            variant="h5"
            sx={{
              lineHeight: 1.6,
              fontSize: { xs: "1rem", sm: "1.5rem" },
            }}
          >
            Wer ich bin, wo meine Schwerpunkte liegen, und wie ich Ihnen helfen
            kann.
          </Typography>
        </Box>

        {/* Profile picture */}
        <Box
          component="img"
          src={profilePicture}
          alt="Profilbild von Ursula Trahasch"
          sx={{
            width: "100%",
            maxWidth: { xs: "200px", sm: "300px" },
            borderRadius: "5%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      </ImageBox>

      <Stack spacing={10} sx={{ marginY: { xs: 4, sm: 5, md: 8 } }}>
        {/* CV */}
        <CV />

        {/* Weiterbildungen */}
        <Weiterbildungen />

        <LogosDisplay />

        {/* Problems grid */}
        <CardGrid cards={problems} title="Wo ich helfen kann" />

        {/* Info */}
        <Stack
          spacing={3}
          sx={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            paddingX: { xs: 2, sm: 4, md: 10 },
          }}
        >
          <Heading lineWidth="35%">Wie ich helfen kann</Heading>
          <Typography
            variant="body1"
            sx={{
              fontSize: 20,
              maxWidth: "800px",
            }}
          >
            Gerne entwickle ich ein Seminar entsprechend Ihren Anliegen und
            thematischen Vorstellungen.
          </Typography>

          {/* Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* To Angebote page */}
            <Button
              variant="outlined"
              color="info"
              sx={{
                padding: "1rem",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
              component={Link}
              to="/angebote"
            >
              Zu meinen Angeboten
            </Button>

            {/* To Kontakt page */}
            <Button
              variant="outlined"
              color="info"
              sx={{
                padding: "1rem",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
              component={Link}
              to="/kontakt"
            >
              Kontakt
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profil;
