import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import SeperatingLine from "./SeperatingLine";

interface Props {
  children: ReactNode;
}

const NextSeminar = ({ children }: Props) => {
  return (
    <Box padding={{ xs: 4, sm: 6, md: 7 }}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ marginY: { xs: 2, sm: 3 } }}
      >
        Anstehende Seminare
      </Typography>
      <SeperatingLine />
      <Stack
        spacing={{ xs: 3, sm: 15 }}
        direction={{ xs: "column", md: "column", lg: "row" }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: { xs: 2, sm: 4, md: 5 },
          alignContent: "center",
          alignItems: "center",
          justifyContent: { xs: "center", md: "center", lg: "space-evenly" },
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default NextSeminar;
