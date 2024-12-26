import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  image: string;
  children: ReactNode;
}

const ImageBox = ({ image, children }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 200px)",
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent),
        url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginRight: "30vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent
          backdropFilter: "blur(0px)", // Blurring effect
          borderRadius: 4,
          padding: 4,
          width: "80%",
          maxWidth: "620px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
        }}
      >
        <Stack sx={{ alignItems: "center", margin: 0 }}>{children}</Stack>
      </Box>
    </Box>
  );
};

export default ImageBox;
