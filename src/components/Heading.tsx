/**
 * Heading.tsx
 *
 * Displays a uniform heading variant with a possible underline.
 */

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import SeperatingLine from "./SeperatingLine";

interface Props {
  children: ReactNode;
  withLine?: boolean;
  lineWidth?: string;
  marginBottom?: number;
  marginTop?: number;
}

const Heading = ({
  children,
  withLine = true,
  lineWidth = "55%",
  marginBottom = 0,
  marginTop = 0,
}: Props) => {
  return (
    <Box width="100%">
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
          marginBottom: { marginBottom },
          marginTop: { marginTop },
        }}
      >
        {children}
      </Typography>
      {withLine && <SeperatingLine width={lineWidth} />}
    </Box>
  );
};

export default Heading;
