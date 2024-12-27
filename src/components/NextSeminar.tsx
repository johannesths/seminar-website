import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const NextSeminar = ({ children }: Props) => {
  return (
    <Box padding={8}>
      <Typography variant="h4" textAlign="center">
        Anstehende Seminare
      </Typography>
      <Stack
        spacing={5}
        direction="row"
        sx={{
          display: "flex",
          padding: 7,
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default NextSeminar;
