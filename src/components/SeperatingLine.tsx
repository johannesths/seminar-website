import { Box } from "@mui/material";

const SeperatingLine = () => {
  return (
    <Box
      sx={{
        width: "50%",
        height: "1px",
        backgroundColor: (theme) => theme.palette.grey[600],
        margin: "5px auto 15px auto",
      }}
    />
  );
};

export default SeperatingLine;
