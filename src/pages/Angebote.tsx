import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import steinImage from "../assets/angebote/steine.jpg";
import brilleImage from "../assets/angebote/brille.jpg";
import meldungImage from "../assets/angebote/meldung.jpg";
import reflexionImage from "../assets/angebote/reflexion.jpg";
import teamImage from "../assets/angebote/team.jpg";

const Angebote = () => {
  const images = [
    { img: steinImage, alt: "stones" },
    { img: brilleImage, alt: "brille" },
    { img: meldungImage, alt: "meldung" },
    { img: reflexionImage, alt: "meldung" },
    { img: teamImage, alt: "team" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Typography variant="h3"></Typography>
      <Box></Box>
      <ImageList sx={{ width: "60%" }} variant="woven" cols={5} gap={15}>
        {images.map((image) => (
          <ImageListItem key={image.alt}>
            <img src={image.img} alt={image.alt} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Angebote;
