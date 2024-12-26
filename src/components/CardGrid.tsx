import {
  Card,
  CardContent,
  Grid2,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ForumIcon from "@mui/icons-material/Forum";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PeopleIcon from "@mui/icons-material/People";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface CardComponent {
  title: string;
  description: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

interface Props {
  cards: CardComponent[];
}
const CardGrid = ({ cards }: Props) => {
  return (
    <Grid2 container spacing={7} margin={15}>
      {cards.map((card) => {
        return (
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
                {/* Card icon goes here */}
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ textAlign: "center" }}
                >
                  {card.title}
                </Typography>
                <Typography sx={{ fontSize: 16 }}>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default CardGrid;
