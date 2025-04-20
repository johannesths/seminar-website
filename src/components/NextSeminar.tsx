/**
 * NextSeminar.tsx
 *
 * Used for displaying only the next upcoming seminars.
 */

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import Heading from "./Heading";

interface Props {
  children: ReactNode;
}

const NextSeminar = ({ children }: Props) => {
  return (
    <Box>
      <Heading lineWidth="40%">Anstehende Seminare</Heading>

      <Stack
        spacing={{ xs: 4, sm: 15 }}
        direction={{ md: "column", lg: "row" }}
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
