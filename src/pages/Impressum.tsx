import { Box, Stack, Toolbar, Typography } from "@mui/material";

const Impressum = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vh",
      }}
    >
      <Stack gap={3}>
        <Typography variant="h2">Impressum</Typography>
        <Typography variant="body1" sx={{ fontSize: 18, lineHeight: 2 }}>
          Ursula Trahasch
          <br />
          Beratung, Coaching, Supervision, Weiterbildung
          <br />
          An der Stadtmauer 12
          <br />
          79346 Endingen am Kaiserstuhl
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: (theme) => theme.palette.grey[300],
            margin: "5px auto 15px auto",
          }}
        />
        <Typography variant="body1">
          Telefon: +49 1523 4204344
          <br />
          Email: kontakt@ursula-trahasch.de
        </Typography>
      </Stack>
    </Box>
  );
};

export default Impressum;
