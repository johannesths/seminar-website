/**
 * ImageBox.tsx
 *
 * Displays an image as full width background with a potential overlay and blur.
 * Also applies a smooth transition from the navbar to the image as the ImageBox component
 * is only used on top of the page.
 */

import { Box } from "@mui/material";
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
        height: { xs: "70vh", md: "calc(100vh - 200px)" },
        width: "100%",
        overflowX: "hidden", // Prevent horizontal overflow
        margin: 0,
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: "absolute",
          margin: 0,
          width: "100%",
          height: "100%",
          // Smooth transition fron navbar
          backgroundImage: `linear-gradient(180deg,rgb(143, 225, 226) 0%, rgba(255, 255, 255, 0.35) 15%, rgba(255, 255, 255, 0) 100%),
          url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // Blur
          filter: blur ? "blur(7px)" : "none",
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
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent)",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { s: "column", md: "row" },
            alignItems: "center",
            position: "relative",
            justifyContent: "center",
            gap: 10,
            backgroundColor: semiTransparentOverlay
              ? "rgba(0, 0, 0, 0.4)"
              : "rgba(0, 0, 0, 0)",
            borderRadius: 4,
            padding: { xs: 2, md: 4 },
            width: { xs: "90%", sm: "85%", md: "80%" },
            maxWidth: "620px",
            boxShadow: semiTransparentOverlay
              ? "0 4px 30px rgba(0, 0, 0, 0.2)"
              : "",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageBox;
