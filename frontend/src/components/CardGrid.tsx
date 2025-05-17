/**
 * CardGrid.tsx
 *
 * Displays a grid of cards with an icon, title and description.
 * The icon is highlighted with a light blue background.
 */

import {
  Box,
  Card,
  CardContent,
  Grid2,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Heading from "./Heading";

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
      {/* Title  */}
      {title && <Heading lineWidth="25%">{title}</Heading>}

      <Grid2
        container
        spacing={{ xs: 3, md: 6 }}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-around",
          marginX: { xs: 2, sm: 5, md: 15 },
          marginY: 5,
        }}
      >
        {/* Cards */}
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid2
              container
              size={{ xs: 12, md: 6 }}
              key={card.title}
              sx={{
                alignContent: "center",
                alignItems: "center",
                display: "flex",
                justifyContent: "space-around",
                margin: 0,
              }}
            >
              <Card
                sx={{
                  // Hover animation
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                  backgroundColor: "#f9fafb",
                  color: "#333",
                  padding: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  height: "100%",
                  width: { sm: "80%", md: "100%", lg: "80%" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
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

                    {/* Card title */}
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        mt: 1,
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>

                  {/* Card description */}
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
