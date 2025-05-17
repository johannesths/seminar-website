/**
 * SeperatingLine.tsx
 *
 * Displays a thin line to seperate sections.
 */

import { Box } from "@mui/material";

interface Props {
  width?: string;
}

const SeperatingLine = ({ width = "55%" }: Props) => {
  return (
    <Box
      sx={{
        width: { width },
        height: "1px",
        backgroundColor: (theme) => theme.palette.grey[600],
        margin: "7px auto 8px auto",
      }}
    />
  );
};

export default SeperatingLine;
