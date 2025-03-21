import { useSeminars } from "../hooks/useSeminars";
import SeminarCard from "../components/SeminarCard";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";

const LIMIT = 10;

const Veranstaltungen = () => {
  const [offset, setOffset] = useState(0);

  const { seminars, loading, error } = useSeminars(LIMIT, offset);

  const handleLoadMore = () => {
    setOffset((previous) => previous + LIMIT);
  };

  if (loading) {
    return <p>Fetching data...</p>;
  } else if (error) {
    return (
      <Typography color="error">
        An error orcurred while loading seminars: {error}
      </Typography>
    );
  } else {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
          p={2}
        >
          {seminars.map((seminar) => (
            <SeminarCard
              seminar_id={seminar.seminar_id}
              key={seminar.seminar_id}
              title={seminar.title}
              description={seminar.description}
              date={seminar.date}
              time={seminar.time}
              image_name={seminar.image_name}
              location={seminar.location}
              max_participants={seminar.max_participants}
              price={seminar.price}
              participants_count={seminar.participants_count}
              url={seminar.url}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{ marginTop: 4 }}
          onClick={handleLoadMore}
          disabled={loading || seminars.length < LIMIT}
        >
          Mehr laden
        </Button>
      </Box>
    );
  }
};

export default Veranstaltungen;
