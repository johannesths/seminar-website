import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import branchImage from "../assets/chelsey-marques-s_nG4v-5KDQ-unsplash.jpg";
import EventLocation from "./EventLocation";

interface Props {
  title: string;
  description: string;
  picture: string;
  location: EventLocation | null;
}

const SeminarCard = ({ title, description, picture, location }: Props) => {
  return (
    <Card sx={{ maxWidth: 500, width: "100%" }}>
      <CardMedia sx={{ height: 200 }} image={picture || branchImage} />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" sx={{ margin: "10px 20px" }}>
          Teilen
        </Button>
        <Button variant="contained">Anmeldung</Button>
      </CardActions>
    </Card>
  );
};

export default SeminarCard;
