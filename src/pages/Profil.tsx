import { Box, Stack, Typography, Divider } from "@mui/material";
import ImageBox from "../components/ImageBox";
import fahrradImage from "../assets/ursula-fahrrad-adria.jpg";
import CV from "../components/CV";
import Weiterbildungen from "../components/Weiterbildungen";
import profilePicture from "../assets/Ursula-Trahasch-2024.jpg";
import CardGrid from "../components/CardGrid";
import { problems } from "../data/Probleme";

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
      <Box>
        <Typography variant="h3">Wie ich helfen kann</Typography>
      </Box>
    </Box>
  );
};

export default Profil;
