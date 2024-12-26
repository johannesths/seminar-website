import { Box, Stack, Typography } from "@mui/material";

const Weiterbildungen = () => {
  const weiterbildungen = [
    {
      year: 2000,
      title: "weiterbildung 1",
      description: "weiter gebildet weiter weitet",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        padding: 5,
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Stack>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Meine Weiterbildungen
        </Typography>
        {/* Seperating Line */}
        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: (theme) => theme.palette.grey[600],
            margin: "5px auto 15px auto",
          }}
        />
        <Box>
          {weiterbildungen.map((weiterbildung) => {
            return (
              <Stack
                direction="row"
                gap={10}
                sx={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">{weiterbildung.year}</Typography>
                </Box>
                <Typography variant="h4">{weiterbildung.title}</Typography>
                <Typography>{weiterbildung.description}</Typography>
              </Stack>
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
};

export default Weiterbildungen;
