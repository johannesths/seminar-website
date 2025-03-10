import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import branchImage from "../assets/chelsey-marques-s_nG4v-5KDQ-unsplash.jpg";
import { Seminar } from "../hooks/useSeminars";
import { useState } from "react";

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
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="overline" sx={{ fontSize: "17px" }}>
          {formatDateTime(date, time)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontSize: 17 }}
        >
          {shortened_description}
        </Typography>
        {description.length > MAX_LENGTH && (
          <Button onClick={() => setExpanded(!expanded)} size="small">
            {expanded ? "Weniger anzeigen" : "Mehr anzeigen"}
          </Button>
        )}
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontSize: 17 }}
        >
          Wo?{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
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
