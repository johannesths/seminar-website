import {
  Box,
  Button,
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
import { useLatestSeminars } from "../hooks/useLatestSeminars";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import chairsImage from "../assets/chairs.jpg";
import { angebote } from "../data/Angebote";
import SeminarCard from "../components/SeminarCard";
import LogosDisplay from "../components/LogosDisplay";

function Index() {
  const leitbegriffe = [
    "Reflexion",
    "Perspektivwechsel",
    "Konfliktlösung",
    "Kommunikation",
    "Autonomie",
    "Konfliktbewältigung",
  ];

  const { seminars, loading, error } = useLatestSeminars(2);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden", // Prevent horizontal overflow
        padding: 0,
      }}
    >
      {/* Main Content */}
      <Box component="main" sx={{ padding: 0 }}>
        <ImageBox
          blur={false}
          semiTransparentOverlay={false}
          image={chairsImage}
        >
          <Stack sx={{ px: { xs: 2, md: 5 } }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Neue Perspektiven entdecken, Potenziale entfalten.
            </Typography>
            <List sx={{ margin: 0, padding: 0 }}>
              {leitbegriffe.map((begriff) => (
                <ListItem key={begriff} disableGutters>
                  <ListItemIcon sx={{ color: "#57ff45" }}>
                    <CheckCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ fontSize: 25, fontWeight: "50px" }}>
                      {" "}
                      {begriff}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Stack direction="row" spacing={{ xs: 2, md: 5 }} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="info"
                size="large"
                href="/veranstaltungen"
              >
                Seminare
              </Button>
              <Button
                variant="contained"
                color="info"
                size="large"
                href="/kontakt"
              >
                Kontakt
              </Button>
            </Stack>
          </Stack>
        </ImageBox>

        <Box sx={{ px: { xs: 2, md: 10 } }}>
          <ProfilePreview />
        </Box>

        <LogosDisplay />

        <Box sx={{ px: { xs: 2, md: 10 } }}>
          <CardGrid cards={angebote} title="Angebote" />
        </Box>

        <Box sx={{ px: { xs: 2, md: 10 } }}>
          <NextSeminar>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              gap={4}
              p={2}
            >
              {seminars.map((seminar) => (
                <SeminarCard
                  id={seminar.id}
                  key={seminar.id}
                  title={seminar.title}
                  description={seminar.description}
                  date={seminar.date}
                  time={seminar.time}
                  category={seminar.category}
                  location={seminar.location}
                  url={seminar.url}
                />
              ))}
            </Box>
          </NextSeminar>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
