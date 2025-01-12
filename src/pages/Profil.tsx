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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around",
        overflowX: "hidden", // Prevent horizontal overflow
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
              fontSize: { xs: "1.8rem", sm: "2.5rem" },
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
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Wer ich bin, wo meine Schwerpunkte liegen, und wie ich Ihnen helfen
            kann.
          </Typography>
        </Box>

        {/* Profile Picture */}
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

      {/* CV */}
      <CV />

      {/* Weiterbildungen */}
      <Weiterbildungen />

      {/* Problems Grid */}
      <CardGrid cards={problems} title="Wo ich helfen kann" />

      {/* Info */}
      <Stack
        spacing={3}
        marginY={10}
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          paddingX: { xs: 2, sm: 4, md: 10 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: "bold",
          }}
        >
          Wie ich helfen kann
        </Typography>
        <SeperatingLine />
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            maxWidth: "800px",
          }}
        >
          Gerne entwickle ich ein Seminar entsprechend Ihren Anliegen und
          thematischen Vorstellungen.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: { xs: "80%", sm: "25%" },
              padding: "0.8rem",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            component={Link}
            to="/angebote"
          >
            Mehr Informationen zu meinen Angeboten
          </Button>
          <Button
            variant="contained"
            sx={{
              width: { xs: "80%", sm: "20%" },
              padding: "0.8rem",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            component={Link}
            to="/kontakt"
          >
            Kontakt
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Profil;
