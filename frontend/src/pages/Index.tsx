/**
 * Index.tsx
 *
 * Serves as the index page of the website.
 * Displays a big image with keywords to catch the attention of the viewer,
 * an introduction, memberships, offers overview and upcoming seminars.
 */

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
import { useSeminars } from "../hooks/useSeminars";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import chairsImage from "../assets/chairs.jpg";
import { angebote } from "../data/Angebote";
import SeminarCard from "../components/SeminarCard";
import LogosDisplay from "../components/LogosDisplay";

function Index() {
  // Key words for list
  const leitbegriffe = [
    "Reflexion",
    "Perspektivwechsel",
    "Konfliktlösung",
    "Kommunikation",
    "Autonomie",
    "Konfliktbewältigung",
  ];

  // Fetch the next 4 seminars
  const { seminars } = useSeminars(4, 0);

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

            {/* Key words list */}
            <List sx={{ margin: 0, padding: 0 }}>
              {leitbegriffe.map((begriff) => (
                <ListItem key={begriff} disableGutters>
                  <ListItemIcon sx={{ color: "#57ff45" }}>
                    <CheckCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ fontSize: 25, fontWeight: "50px" }}>
                      {begriff}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>

            {/* Redirect buttons */}
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

        {/* Main content */}
        <Stack spacing={8} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ px: { xs: 2, md: 10 } }}>
            <ProfilePreview />
          </Box>

          <LogosDisplay />

          <Box
            sx={{
              px: { xs: 2, md: 10 },
            }}
          >
            <CardGrid cards={angebote} title="Angebote" />
            <Button
              variant="contained"
              href="/angebote"
              sx={{
                display: "flex",
                margin: "0 auto",
                maxWidth: "300px",
              }}
            >
              Zu den Angeboten
            </Button>
          </Box>

          {/* Upcoming seminars */}
          <NextSeminar>
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
              {seminars.map((seminar) => (
                <SeminarCard
                  seminar_id={seminar.seminar_id}
                  key={seminar.seminar_id}
                  title={seminar.title}
                  description={seminar.description}
                  date={seminar.date}
                  time={seminar.time}
                  image_name={seminar.image_name}
                  location={seminar.location}
                  max_participants={seminar.max_participants}
                  price={seminar.price}
                  participants_count={seminar.participants_count}
                  url={seminar.url}
                />
              ))}
            </Box>
          </NextSeminar>
        </Stack>
      </Box>
    </Box>
  );
}

export default Index;
