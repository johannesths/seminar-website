import {
  Box,
  Button,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import chairsImage from "../assets/chairs.jpg";

const ImageBox = () => {
  const leitbegriffe = [
    "Reflexion",
    "Perspektivwechsel",
    "Konfliktlösung",
    "Kommunikation",
    "Autonomie",
    "Konfliktbewältigung",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 170px)",
        backgroundImage: `url(${chairsImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={10}>
          <Grid2 size={10} sx={{ padding: 0, mr: 50 }}>
            <Stack sx={{ alignItems: "center", margin: 0 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Neue Perspektiven entdecken, Potenziale entfalten.
              </Typography>

              <Typography sx={{ mt: 0, mb: 1 }} variant="h6" component="div">
                {/* Potential List Header */}
              </Typography>
              <List sx={{ mr: 10 }}>
                {leitbegriffe.map((begriff) => {
                  return (
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          color: "#37a340",
                        }}
                      >
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText>{begriff}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
              <Stack direction="row" spacing={16} sx={{ mt: 3 }}>
                <Button variant="contained">Seminare</Button>
                <Button variant="outlined">Kontakt</Button>
              </Stack>
            </Stack>
          </Grid2>

          {/* <Grid2 size={1}>
            <Typography></Typography>
          </Grid2> */}
        </Grid2>
      </Container>
    </Box>
  );
};

export default ImageBox;
