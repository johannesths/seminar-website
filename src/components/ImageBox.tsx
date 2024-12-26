import { Box, Container, Grid2, Stack } from "@mui/material";
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
        height: "calc(100vh - 170px)",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={10}>
          <Grid2 size={10} sx={{ padding: 0, mr: 50 }}>
            <Stack sx={{ alignItems: "center", margin: 0 }}>{children}</Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default ImageBox;
