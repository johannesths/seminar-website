import {
  Box,
  Card,
  CardContent,
  Grid2,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import SeperatingLine from "./SeperatingLine";

export interface CardComponent {
  title: string;
  description: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

interface Props {
  cards: CardComponent[];
  title: string;
}

const CardGrid = ({ cards, title }: Props) => {
  return (
    <Box sx={{ padding: 0, margin: "0 auto" }}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ marginTop: 10, padding: 0 }}
      >
        {title}
      </Typography>
      <SeperatingLine />
      <Grid2
        container
        spacing={{ xs: 3, md: 6 }}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          marginX: { xs: 2, sm: 5, md: 15 },
          marginY: 5,
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid2 container size={{ xs: 12, md: 6 }} key={card.title}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  backgroundColor: "#f0f4ff",
                  color: "#333",
                  padding: { xs: 2, sm: 3 }, // Responsive padding
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 30,
                        color: (theme) => theme.palette.primary.main,
                        marginRight: 3,
                      }}
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "auto 0",
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 16 }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default CardGrid;
