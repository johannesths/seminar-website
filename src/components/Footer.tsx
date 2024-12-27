import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        bottom: 0,
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
        spacing={14}
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
          to="/agb"
        >
          AGB
        </Button>
      </Stack>
      {/* Seperating Line */}
      <Box
        sx={{
          width: "50%",
          height: "1px",
          backgroundColor: (theme) => theme.palette.grey[300],
          margin: "5px auto 15px auto",
        }}
      />
      <Typography variant="body2">
        © {new Date().getFullYear()} Ursula Trahasch
      </Typography>
    </Box>
  );
};

export default Footer;
