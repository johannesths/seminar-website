import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import SeperatingLine from "./SeperatingLine";

interface Props {
  children: ReactNode;
}

const NextSeminar = ({ children }: Props) => {
  return (
    <Box padding={8}>
      <Typography variant="h3" textAlign="center">
        Anstehende Seminare
      </Typography>
      <SeperatingLine />
      <Stack
        spacing={5}
        direction="row"
        sx={{
          display: "flex",
          padding: 7,
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default NextSeminar;
