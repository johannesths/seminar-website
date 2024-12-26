import { Box, Stack, Typography, Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const CV = () => {
  const events = [
    { date: "2023", description: "Start" },
    { date: "2024", description: "blabla" },
    { date: "2025", description: "bliblibli" },
    { date: "2026", description: "fjdasnjnoj" },
    { date: "2027", description: "badsinfjnaoiün" },
  ];

  return (
    <Box sx={{ margin: "6vh 15vh" }}>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignContent: "center",
          margin: "0 auto",
          paddingTop: 10,
          paddingBottom: 0,
        }}
      >
        <Box sx={{ maxWidth: "75vh" }}>
          <Typography variant="h3">Mein Lebenslauf</Typography>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
            commodi dicta explicabo facere recusandae illo. Eaque, illum quam
            eum quisquam, doloremque possimus quibusdam accusantium aspernatur
            impedit recusandae, ullam itaque placeat!
          </Typography>
        </Box>
        <Box sx={{ padding: 10 }}>
          <Grid>
            {events.map((event, index) => (
              <Grid
                container
                key={index}
                sx={{ alignItems: "center", marginBottom: 2 }}
              >
                {/* Left column: line and point */}
                <Grid item xs={2} sx={{ textAlign: "center", mt: 0 }}>
                  <CircleIcon sx={{ fontSize: 13, color: "primary.main" }} />
                  {index < events.length - 1 && (
                    <Box
                      sx={{
                        width: "2px",
                        height: "50px",
                        backgroundColor: "primary.main",
                        margin: "0 auto",
                      }}
                    />
                  )}
                </Grid>

                {/* Right column: short description */}
                <Grid item xs={10}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {event.date}
                  </Typography>
                  <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    {event.description}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default CV;
