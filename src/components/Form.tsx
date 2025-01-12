import {
  Box,
  Button,
  CssBaseline,
  Grid,
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
        padding: 0,
      }}
    >
      <CssBaseline />

      {/* Main Content */}
      <Box component="main">
        {/* Hero Section with Image */}
        <ImageBox
          blur={false}
          semiTransparentOverlay={true}
          image={chairsImage}
        >
          <Grid
            container
            spacing={2}
            sx={{
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 10 },
              py: { xs: 5, md: 10 },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "2.5rem" },
                }}
              >
                Neue Perspektiven entdecken, Potenziale entfalten.
              </Typography>

              <List>
                {leitbegriffe.map((begriff) => (
                  <ListItem key={begriff} disableGutters>
                    <ListItemIcon
                      sx={{
                        color: "#37a340",
                      }}
                    >
                      <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={begriff}
                      primaryTypographyProps={{
                        fontSize: { xs: "1rem", md: "1.25rem" },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  mt: 3,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Button variant="contained" sx={{ px: 4 }}>
                  Seminare
                </Button>
                <Button variant="contained" color="secondary" sx={{ px: 4 }}>
                  Kontakt
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </ImageBox>

        {/* Card Grid Section */}
        <Box sx={{ px: { xs: 2, md: 10 }, py: { xs: 5, md: 10 } }}>
          <CardGrid cards={angebote} title="Angebote" />
        </Box>

        {/* Profile Preview */}
        <Box sx={{ px: { xs: 2, md: 10 }, py: { xs: 5, md: 10 } }}>
          <ProfilePreview />
        </Box>

        {/* Next Seminar Section */}
        <Box sx={{ px: { xs: 2, md: 10 }, py: { xs: 5, md: 10 } }}>
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
    </Box>
  );
}

export default Index;
