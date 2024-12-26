import { Card, CardContent, Grid2, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ForumIcon from "@mui/icons-material/Forum";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleIcon from "@mui/icons-material/People";
const CardGrid = () => {
  return (
    <Grid2 container spacing={7} margin={15}>
      <Grid2 size={6}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#f0f4ff",
            color: "#333",
          }}
        >
          <CardContent>
            <VisibilityIcon />
            <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
              Transaktionsanalyse
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Die Transaktionsanalyse ist ein wirkungsvolles Modell zur Analyse
              und Gestaltung von zwischenmenschlicher Kommunikation und
              Beziehungen. Sie hilft, Verhaltensmuster zu erkennen, innere
              Prozesse zu verstehen und bewusste Veränderungen hin zu mehr
              Autonomie und Klarheit einzuleiten.
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={6}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#f0f4ff",
            color: "#333",
          }}
        >
          <CardContent>
            <ForumIcon />
            <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
              Beratung
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              In der Beratung werden Veränderungsprozesse aktiv begleitet und
              gestaltet. Das Ziel ist, die eigene Fähigkeit zur Problemlösung zu
              stärken und die Entscheidungs- sowie Handlungsfähigkeit
              weiterzuentwickeln.
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={6}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#f0f4ff",
            color: "#333",
          }}
        >
          <CardContent>
            <HandshakeIcon />
            <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
              Coaching
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Coaching ist eine beratende Begleitung im beruflichen Kontext.
              Dabei wird das eigene berufliche Handeln reflektiert, um es
              gezielt und ressourcenorientiert weiterzuentwickeln. Der
              Coachingprozess unterstützt dabei, die eigene Rolle bewusst zu
              gestalten, Handlungsoptionen in herausfordernden Situationen zu
              erkennen und aktiv umzusetzen.
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={6}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#f0f4ff",
            color: "#333",
          }}
        >
          <CardContent>
            <PeopleIcon />
            <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
              Supervision
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Supervision ist ein etabliertes Beratungsformat im beruflichen
              Kontext, das der Reflexion von Arbeitsbedingungen, spezifischen
              Herausforderungen sowie Kommunikations- und Verhaltensmustern von
              Fach- und Führungskräften dient.
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default CardGrid;
