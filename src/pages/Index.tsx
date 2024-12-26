import {
  Box,
  Button,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CardGrid from "../components/CardGrid";
import ImageBox from "../components/ImageBox";
import NextSeminar from "../components/NextSeminar";
import ProfilePreview from "../components/ProfilePreview";
import SeminarCard from "../components/SeminarCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import chairsImage from "../assets/chairs.jpg";
import { angebote } from "../data/Angebote";

function Index() {
  const leitbegriffe = [
    "Reflexion",
    "Perspektivwechsel",
    "Konfliktlösung",
    "Kommunikation",
    "Autonomie",
    "Konfliktbewältigung",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      {/* Main Content */}
      <Box component="main">
        <ImageBox image={chairsImage}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Neue Perspektiven entdecken, Potenziale entfalten.
          </Typography>

          <Typography sx={{ mt: 0, mb: 1 }} variant="h6" component="div">
            {/* Potential List Header */}
          </Typography>
          <List sx={{ mr: 10 }}>
            {leitbegriffe.map((begriff) => {
              return (
                <ListItem>
                  <ListItemIcon
                    sx={{
                      color: "#37a340",
                    }}
                  >
                    <CheckCircleIcon />
                  </ListItemIcon>
                  <ListItemText>{begriff}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          <Stack direction="row" spacing={16} sx={{ mt: 3 }}>
            <Button variant="contained">Seminare</Button>
            <Button variant="outlined">Kontakt</Button>
          </Stack>
        </ImageBox>
        <CardGrid cards={angebote} />
        <ProfilePreview />
        <NextSeminar>
          <SeminarCard
            title="Test"
            description="abcdefgh"
            picture=""
            location={null}
          />
          <SeminarCard
            title="Test"
            description="abcdefgh"
            picture=""
            location={null}
          />
        </NextSeminar>
      </Box>
    </Box>
  );
}

export default Index;
