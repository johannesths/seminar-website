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
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          margin: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
            padding: { xs: 2, md: 4 }, // Responsive padding
            width: { xs: "90%", sm: "85%", md: "80%" }, // Adjust widths
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
