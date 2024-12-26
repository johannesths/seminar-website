import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import profilePicture from "../assets/Ursula-Trahasch-400.jpg";

const ProfilePreview = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ padding: 2 }}
      >
        {/* Text Section */}
        <Grid key="profile-description" item xs={12} md={6} sx={{ padding: 2 }}>
          <Typography
            sx={{ fontSize: 18, marginBottom: 2, textAlign: "justify" }}
          >
            Als Transaktionsanalytikerin berate ich Einzelpersonen und Teams,
            vor allem aus pädagogischen und sozialen Arbeitsbereichen. Mein
            Leitgedanke: Jeder Mensch möchte seine Potenziale entfalten. Ich
            biete einen professionellen Rahmen, um persönliche und berufliche
            Anliegen konstruktiv zu reflektieren und Veränderungen anzugehen.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button variant="contained">Mehr erfahren</Button>
          </Box>
        </Grid>

        {/* Image Section */}
        <Grid key="profile-picture" item xs={12} md={4} sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <img
              src={profilePicture}
              alt="Profilbild"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "3%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePreview;
