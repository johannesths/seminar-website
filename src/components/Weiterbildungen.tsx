/**
 * Weiterbildungen.tsx
 *
 * Displays a table without edges taht shows further training
 * the person participated in with title, description and year.
 */

import { Box, Stack, Typography } from "@mui/material";
import Heading from "./Heading";
import { weiterbildungen } from "../data/Weiterbildungen";

const Weiterbildungen = () => {
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
      {/* Heading */}
      <Heading lineWidth="35%">Weiterbildungen</Heading>

      {/* Content */}
      <Stack
        spacing={2}
        direction="column"
        sx={{ display: "flex", alignItems: "flex-start", marginTop: 2 }}
      >
        {weiterbildungen.map((weiterbildung, index) => (
          <Stack key={index} direction="row" gap={5}>
            {/* Timeline and title */}
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
            {/* Description */}
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
