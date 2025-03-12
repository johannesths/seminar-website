import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import branchImage from "../assets/branches.jpg";
import teamImage from "../assets/angebote/team.jpg";
import whiteboardImage from "../assets/angebote/whiteboard.jpg";
import kidsImage from "../assets/angebote/kids.jpg";
import handshakeImage from "../assets/angebote/handshake.jpg";
import climberImage from "../assets/angebote/climber.png";
import knotImage from "../assets/angebote/knot.jpg";
import { Seminar } from "../hooks/useSeminars";
import { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Maximum characters before "read more"
const MAX_LENGTH = 200;

// Format datetime into German Format dd.mm.yyyy, um 12:12 Uhr
const formatDateTime = (date: string, time: string): string => {
  const [year, month, day] = date.split("-");
  const formattedTime = time.slice(0, 5);
  return `${day}.${month}.${year}, um ${formattedTime} Uhr`;
};

const SeminarCard = ({
  id,
  title,
  description,
  date,
  time,
  category,
  location,
  url,
}: Seminar) => {
  const [expanded, setExpanded] = useState(false);

  const shortened_description =
    description.length > MAX_LENGTH && !expanded
      ? description.substring(0, MAX_LENGTH) + "..."
      : description;

  return (
    <Card key={id} sx={{ maxWidth: 600, width: "100%" }}>
      <CardMedia sx={{ height: 200 }} image={branchImage} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ marginBottom: 0 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontSize: 17 }}
        >
          {shortened_description}
        </Typography>
        {description.length > MAX_LENGTH && (
          <Button
            sx={{ marginTop: 1, padding: 0, fontSize: 15 }}
            onClick={() => setExpanded(!expanded)}
            size="small"
          >
            {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
          </Button>
        )}
        <br />
        <Typography
          variant="overline"
          sx={{ fontSize: "17px", display: "flex", alignItems: "center" }}
        >
          <AccessTimeIcon sx={{ marginX: 1 }} />
          {formatDateTime(date, time)}
        </Typography>
        <Typography
          variant="overline"
          sx={{
            color: "text.primary",
            fontSize: 17,
            display: "flex",
            alignItems: "center",
          }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <PlaceIcon sx={{ marginX: 1 }} />
            {location}
          </a>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" sx={{ margin: "10px 20px" }}>
          Teilen
        </Button>
        <Button
          variant="contained"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Anmeldung
        </Button>
      </CardActions>
    </Card>
  );
};

export default SeminarCard;
