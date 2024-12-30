import { Box, Stack, Typography, Divider, Button } from "@mui/material";
import ImageBox from "../components/ImageBox";
import fahrradImage from "../assets/ursula-fahrrad-adria.jpg";
import CV from "../components/CV";
import Weiterbildungen from "../components/Weiterbildungen";
import profilePicture from "../assets/Ursula-Trahasch-2024.jpg";
import CardGrid from "../components/CardGrid";
import { problems } from "../data/Probleme";
import SeperatingLine from "../components/SeperatingLine";
import { Link } from "react-router-dom";

const Profil = () => {
  return (
    <Box>
      <ImageBox blur={true} semiTransparentOverlay={false} image={fahrradImage}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={10}
          alignItems="center"
          sx={{
            padding: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Text */}
          <Box sx={{ minWidth: "60%", textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              Ursula Trahasch
            </Typography>
            <Divider
              sx={{
                width: { xs: "80%", md: "100%" },
                marginY: "1rem",
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                lineHeight: 1.6,
              }}
            >
              Wer ich bin, wo meine Schwerpunkte liegen, und wie ich Ihnen
              helfen kann.
            </Typography>
          </Box>

          {/* Profile picture */}
          <img
            src={profilePicture}
            alt="Profilbild"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "5%",
            }}
          />
        </Stack>
      </ImageBox>
      <CV />
      <Weiterbildungen />
      {/* Problems Grid */}
      <CardGrid cards={problems} title="Wo ich helfen kann" />
      <Stack
        marginY={10}
        sx={{ display: "flex", textAlign: "center", alignItems: "center" }}
      >
        <Typography variant="h3">Wie ich helfen kann</Typography>
        <SeperatingLine />
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Gerne entwickle ich ein Seminar entsprechend Ihren Anliegen und
          thematischen Vorstellungen.
        </Typography>
        <Button
          variant="outlined"
          sx={{ margin: "10px 20px", width: "25%" }}
          component={Link}
          to="/angebote"
        >
          Mehr Informationen zu meinen Angeboten
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "10px 20px", width: "20%" }}
          component={Link}
          to="/kontakt"
        >
          Kontakt
        </Button>
      </Stack>
    </Box>
  );
};

export default Profil;
