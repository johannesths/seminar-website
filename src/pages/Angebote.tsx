import {
  Box,
  Grid,
  // ImageList,
  // ImageListItem,
  List,
  ListItem,
  Typography,
} from "@mui/material";
// import steinImage from "../assets/angebote/steine.jpg";
// import brilleImage from "../assets/angebote/brille.jpg";
// import meldungImage from "../assets/angebote/meldung.jpg";
// import reflexionImage from "../assets/angebote/reflexion.jpg";
// import teamImage from "../assets/angebote/team.jpg";
import SeperatingLine from "../components/SeperatingLine";
import { angebote } from "../data/Angebote";

const Angebote = () => {
  // const images = [
  //   { img: steinImage, alt: "stones" },
  //   { img: brilleImage, alt: "brille" },
  //   { img: meldungImage, alt: "meldung" },
  //   { img: reflexionImage, alt: "reflexion" },
  //   { img: teamImage, alt: "team" },
  // ];

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
          sx={{ fontSize: FONTSIZE, marginBottom: 2 }}
        >
          In meiner Arbeit biete ich fundierte und individuell zugeschnittene
          Beratungs-, Coaching- und Weiterbildungsangebote an. Dabei stehen
          persönliche Entwicklung, Reflexion beruflicher Rollen sowie die
          Verbesserung von Kommunikation und Zusammenarbeit im Fokus. Jedes
          Angebot kann an die spezifischen Anliegen und Herausforderungen der
          Klienten angepasst werden. Bei Fragen nutzen Sie gerne das{" "}
          <a href="/kontakt">Kontaktformular</a>.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: FONTSIZE }}>
          Die Schwerpunkte meiner Arbeit sind Transaktionsanalyse, Beratung,
          Coaching und Supervision.
        </Typography>
      </Box>

      {/* Grid für Angebote */}
      <Grid
        container
        spacing={8}
        sx={{ marginTop: 1, width: "100%", fontSize: FONTSIZE }}
      >
        {angebote.map((angebot, index) => {
          const Icon = angebot.icon;
          return (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ textAlign: "left" }}>
                {/* Title + icon */}
                <Box
                  sx={{
                    display: "flex",
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

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: 1,
                    fontSize: FONTSIZE,
                    textAlign: "center",
                  }}
                >
                  {angebot.description}
                </Typography>

                {/* Target groups */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: FONTSIZE,
                    textAlign: "center",
                  }}
                >
                  Zielgruppen:
                </Typography>
                <List dense sx={{ paddingLeft: 2 }}>
                  {angebot.targetGroups.map((group, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        display: "list-item",
                        padding: 0,
                        fontSize: FONTSIZE,
                        textAlign: "center",
                      }}
                    >
                      •{group}
                    </ListItem>
                  ))}
                </List>

                {/* Example Topics */}
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    marginTop: 1,
                    fontSize: FONTSIZE,
                    textAlign: "center",
                  }}
                >
                  Beispielthemen:
                </Typography>
                <List dense sx={{ paddingLeft: 2 }}>
                  {angebot.exampleTopics.map((topic, id) => (
                    <ListItem
                      key={id}
                      sx={{
                        display: "list-item",
                        padding: 0,
                        fontSize: FONTSIZE,
                        textAlign: "center",
                      }}
                    >
                      •{topic}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          );
        })}
      </Grid>
{/* 
      <ImageList sx={{ width: "70%" }} variant="woven" cols={5} gap={15}>
        {images.map((image) => (
          <ImageListItem key={image.alt}>
            <img src={image.img} alt={image.alt} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList> */}
    </Box>
  );
};

export default Angebote;
