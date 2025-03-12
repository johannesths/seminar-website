import { Box, Grid } from "@mui/material";
import DGTALogo from "../assets/DGTA-logo.jpg";
import EASCLogo from "../assets/EASC-logo.png";
import EATALogo from "../assets/EATA-logo.png";

const LogosDisplay = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 4 }}
    >
      {[EASCLogo, EATALogo, DGTALogo].map((logo) => (
        <Grid item xs={6} sm={4} md={3} key={logo}>
          <Box
            component="img"
            src={logo}
            alt={`Logo ${logo}`}
            loading="lazy"
            sx={{
              width: "100%",
              maxWidth: "300px",
              height: "auto", // Keep aspect ratio
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default LogosDisplay;
