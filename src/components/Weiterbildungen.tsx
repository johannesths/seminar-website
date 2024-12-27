import { Box, Stack, Typography } from "@mui/material";

const Weiterbildungen = () => {
  const weiterbildungen = [
    {
      begin: 1996,
      end: 1998,
      title: "Konfliktberatung",
      description:
        "Beratung in Konfliktsituationen während der Schwangerschaft Deutscher Caritasverband Freiburg",
    },
    {
      begin: 1997,
      end: 2000,
      title: "Gestaltberaterin & Gestaltgruppenleiterin",
      description: "Gestalttherapeutische Weiterbildung am Institut Kontakte",
    },
    {
      begin: 1999,
      end: 2001,
      title: "Sozial- und heilpädagogische Kunsttherapie",
      description:
        "Weiterbildung sozial- und heilpädagogische Kunsttherapie an der Katholischen Hochschule Freiburg",
    },
    {
      begin: 2002,
      end: 2002,
      title: "Kess-Erziehen-Kursleiterin",
      description:
        "Weiterbildung zur Kess-erziehen-Kursleiterin Erzdiözese Freiburg, Familienreferat",
    },
    {
      begin: 2003,
      end: 2018,
      title: "Ausbildung zur Transaktionsanalytikerin",
      description:
        "Abschluss: zertifizierte Transaktionsanalytikerin im Anwendungsfeld Beratung (CTA-C)",
    },
    {
      begin: 2019,
      end: -1,
      title: "Ausbildung zur lehrenden Transaktionsanalytikerin",
      description:
        "bei Petra Noelle, Emmendingen, und Dr. Kohlhaas-Reith, Waldkirch",
    },
    {
      begin: 2021,
      end: 2021,
      title: "Supervisorin (EASC)",
      description:
        "Supervisorin bei der European Association for Supervision and Coaching",
    },
  ];
  return (
    <Box
      sx={{
        paddingX: 15,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Weiterbildungen
      </Typography>
      {/* seperating Line */}
      <Box
        sx={{
          width: "50%",
          height: "1px",
          backgroundColor: (theme) => theme.palette.grey[600],
          margin: "5px auto 15px auto",
        }}
      />
      {/* content */}
      <Stack
        spacing={4}
        direction="column"
        sx={{ display: "flex", alignItems: "flex-start" }}
      >
        {weiterbildungen.map((weiterbildung, index) => (
          <Stack key={index} direction="row" gap={5}>
            {/* timeline and title */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography variant="body1" textAlign="left">
                {weiterbildung.begin} -{" "}
                {weiterbildung.end === -1 ? "heute" : weiterbildung.end}
              </Typography>
            </Box>
            {/* description */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {weiterbildung.title}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {weiterbildung.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Weiterbildungen;
