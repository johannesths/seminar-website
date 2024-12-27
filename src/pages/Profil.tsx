import { Box, Typography } from "@mui/material";
import ImageBox from "../components/ImageBox";
import fahrradImage from "../assets/ursula-fahrrad-adria.jpg";
import CV from "../components/CV";
import Weiterbildungen from "../components/Weiterbildungen";
const Profil = () => {
  return (
    <Box>
      <ImageBox blur={true} semiTransparentOverlay={false} image={fahrradImage}>
        <Typography variant="h3">Ursula Trahasch</Typography>
      </ImageBox>
      <CV />
      <Weiterbildungen />
    </Box>
  );
};

export default Profil;
