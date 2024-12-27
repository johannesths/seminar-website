import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  image: string;
  children: ReactNode;
  blur: boolean;
  semiTransparentOverlay: boolean;
}

const ImageBox = ({ image, children, blur, semiTransparentOverlay }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 200px)",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: blur ? "blur(7px)" : "none", // blur
          zIndex: 1,
        }}
      />
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent)",
          zIndex: 2, // Overlay
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
            backgroundColor: semiTransparentOverlay
              ? "rgba(0, 0, 0, 0.4)"
              : "rgba(0, 0, 0, 0)", // Semi-transparent
            borderRadius: 4,
            padding: 4,
            width: "80%",
            maxWidth: "620px",
            boxShadow: semiTransparentOverlay
              ? "0 4px 30px rgba(0, 0, 0, 0.2)"
              : "", // Subtle shadow for depth
          }}
        >
          <Stack sx={{ alignItems: "center", margin: 0 }}>{children}</Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageBox;
