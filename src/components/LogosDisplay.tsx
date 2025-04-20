/**
 * LogoDisplay.tsx
 *
 * Displays three logos of the associations the person is
 * a member of in a row.
 */

import { Box, Grid, Typography } from "@mui/material";
import DGTALogo from "../assets/DGTA-logo.jpg";
import EASCLogo from "../assets/EASC-logo.png";
import EATALogo from "../assets/EATA-logo.png";

const LogosDisplay = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="overline" fontSize={18}>
        Mitgliedschaften
      </Typography>

      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        marginTop={1}
        marginBottom={3}
      >
        {/* Logos */}
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
                height: "auto",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LogosDisplay;
