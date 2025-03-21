import {
  Box,
  Button,
  Grid,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import SeperatingLine from "../components/SeperatingLine";
import { angebote } from "../data/Angebote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

const Angebote = () => {
  const FONTSIZE = 18;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 3,
        textAlign: "center",
        paddingX: { xs: 2, sm: 5, md: 10 },
      }}
      gap={4}
    >
      {/* Title and Introduction */}
      <Typography variant="h3" sx={{ marginTop: 3 }}>
        Angebote und Schwerpunkte
      </Typography>
      <SeperatingLine />
      <Box sx={{ maxWidth: "1400px" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: FONTSIZE,
            marginBottom: 2,
            lineHeight: 1.8,
            color: "text.primary",
          }}
        >
          In meiner Arbeit biete ich fundierte und individuell zugeschnittene
          Beratungs-, Coaching- und Weiterbildungsangebote an. Dabei stehen
          persönliche Entwicklung, Reflexion beruflicher Rollen sowie die
          Verbesserung von Kommunikation und Zusammenarbeit im Fokus. Jedes
          Angebot kann an die spezifischen Anliegen und Herausforderungen der
          Klienten angepasst werden. Bei Fragen nutzen Sie gerne das{" "}
          <Link component={RouterLink} to="/kontakt" underline="hover">
            Kontaktformular
          </Link>
          .
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: FONTSIZE, lineHeight: 1.8 }}
        >
          Die Schwerpunkte meiner Arbeit sind Transaktionsanalyse, Beratung,
          Coaching und Supervision.
        </Typography>
      </Box>
      {/* Grid for Angebote */}
      <Grid
        container
        spacing={6}
        sx={{ marginTop: 1, width: "100%", fontSize: FONTSIZE }}
      >
        {angebote.map((angebot, index) => {
          const Icon = angebot.icon;
          return (
            <Grid item xs={12} md={6} key={index} sx={{ mb: 5 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 3,
                    padding: 3,
                    boxShadow: 2,
                    height: "100%",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                    textAlign: "left",
                  }}
                >
                  {/* Title + Icon */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 1,
                      textAlign: "center",
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 36,
                        marginRight: 1.5,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="h5">{angebot.title}</Typography>
                  </Box>
                  <SeperatingLine />

                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: 1,
                      fontSize: FONTSIZE,
                      lineHeight: 1.6,
                    }}
                  >
                    {angebot.description}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", fontSize: FONTSIZE, mt: 2 }}
                  >
                    Zielgruppen:
                  </Typography>
                  <List dense>
                    {angebot.targetGroups.map((group, idx) => (
                      <ListItem
                        key={idx}
                        sx={{ display: "flex", alignItems: "center", pl: 0 }}
                      >
                        <CheckCircleIcon
                          color="primary"
                          sx={{ fontSize: 20, mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ fontSize: FONTSIZE }}>
                          {group}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>

                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      marginTop: 2,
                      fontSize: FONTSIZE,
                    }}
                  >
                    Beispielthemen:
                  </Typography>
                  <List dense>
                    {angebot.exampleTopics.map((topic, id) => (
                      <ListItem
                        key={id}
                        sx={{ display: "flex", alignItems: "center", pl: 0 }}
                      >
                        <CheckCircleIcon
                          color="primary"
                          sx={{ fontSize: 20, mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ fontSize: FONTSIZE }}>
                          {topic}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mb: 5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: { xs: "80%", sm: "25%" },
            padding: "0.8rem",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
          component={RouterLink}
          to="/veranstaltungen"
        >
          Zu den Veranstaltungen
        </Button>
        <Button
          variant="contained"
          sx={{
            width: { xs: "80%", sm: "20%" },
            padding: "0.8rem",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
          component={RouterLink}
          to="/kontakt"
        >
          Kontakt
        </Button>
      </Stack>
    </Box>
  );
};

export default Angebote;
