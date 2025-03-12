import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 1, sm: 2 },
        textAlign: "center",
        backgroundColor: (theme) => theme.palette.grey[100],
        bottom: 0,
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 4, sm: 8, md: 14 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="text"
          sx={{ my: 2, color: "black", display: "block" }}
          component={Link}
          to="/datenschutz"
        >
          Datenschutz
        </Button>

        <Button
          variant="text"
          sx={{ my: 2, color: "black", display: "block" }}
          component={Link}
          to="/impressum"
        >
          Impressum
        </Button>

        <Button
          variant="text"
          sx={{ my: 2, color: "black", display: "block" }}
          component={Link}
          to="/kontakt"
        >
          Kontakt
        </Button>
      </Stack>
      {/* Separating Line */}
      <Box
        sx={{
          width: "80%",
          maxWidth: "400px",
          height: "1px",
          backgroundColor: (theme) => theme.palette.grey[300],
          margin: "5px auto 15px auto",
        }}
      />
      <Typography variant="body2">© {currentYear} Ursula Trahasch</Typography>
    </Box>
  );
};

export default Footer;
