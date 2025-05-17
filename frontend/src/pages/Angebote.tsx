/**
 * Angebote.tsx
 *
 * Displays an overview of seminar offerings, divided into
 * four subsections.
 */

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
import Heading from "../components/Heading";

const Angebote = () => {
  const FONTSIZE = 18;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 4,
        textAlign: "center",
        paddingX: { xs: 2, sm: 5, md: 10 },
      }}
      gap={2}
    >
      {/* Title */}
      <Heading>Angebote und Schwerpunkte</Heading>
      <Box sx={{ maxWidth: "1400px" }}>
        {/* Introduction */}
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
        <Typography variant="body1" sx={{ fontSize: FONTSIZE }}>
          Die Schwerpunkte meiner Arbeit sind Transaktionsanalyse, Beratung,
          Coaching und Supervision.
        </Typography>
      </Box>

      {/* Grid for Angebote */}
      <Grid
        container
        spacing={6}
        sx={{ marginTop: 1, width: "95%", fontSize: FONTSIZE }}
      >
        {angebote.map((angebot, index) => {
          const Icon = angebot.icon;
          return (
            <Grid item xs={12} md={6} key={index} sx={{ display: "flex" }}>
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
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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
                      textAlign: "center",
                    }}
                  >
                    {/* Icon, highlighted with light blue background */}
                    <Box
                      sx={{
                        backgroundColor: (theme) => theme.palette.primary.light,
                        borderRadius: "50%",
                        padding: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 45,
                        height: 45,
                        margin: 2,
                      }}
                    >
                      <Icon sx={{ fontSize: 30, color: "#fff" }} />
                    </Box>
                    <Typography variant="h5">{angebot.title}</Typography>
                  </Box>
                  <SeperatingLine />

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: 1,
                      textAlign: "center",
                      fontSize: FONTSIZE,
                      lineHeight: 1.6,
                    }}
                  >
                    {angebot.description}
                    <br />
                  </Typography>

                  {/* Target groups list */}
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
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          paddingX: 5,
                        }}
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

                  {/* Example topics list */}
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
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          paddingX: 5,
                        }}
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

      {/* Buttons */}
      <Stack
        direction="column"
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginY: 5,
        }}
      >
        {/* To Veranstaltungen page */}
        <Button
          variant="contained"
          sx={{
            padding: "1rem",
            fontSize: 15,
          }}
          component={RouterLink}
          to="/veranstaltungen"
        >
          Zu den Veranstaltungen
        </Button>

        {/* To Kontakt page */}
        <Button
          variant="outlined"
          sx={{
            padding: "1rem",
            fontSize: 15,
          }}
          component={RouterLink}
          to="/kontakt"
        >
          Gespräch vereinbaren
        </Button>
      </Stack>
    </Box>
  );
};

export default Angebote;
