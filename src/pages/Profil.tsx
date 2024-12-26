import { Box, Typography } from "@mui/material";
import ImageBox from "../components/ImageBox";
import fahrradImage from "../assets/ursula-fahrrad-adria.jpg";
import CV from "../components/CV";
const Profil = () => {
  return (
    <Box>
      <ImageBox image={fahrradImage}>
        <Typography variant="h3">Ursula Trahasch</Typography>
      </ImageBox>
      <CV />
    </Box>
  );
};

export default Profil;
