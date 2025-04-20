/**
 * Veranstaltungen.tsx
 *
 * Displays the seminars with pagination.
 */

import { useSeminars } from "../hooks/useSeminars";
import SeminarCard from "../components/SeminarCard";
import Pagination from "@mui/material/Pagination";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Heading from "../components/Heading";

// Seminars per page
const LIMIT = 8;

const Veranstaltungen = () => {
  const [page, setPage] = useState(1);
  const { seminars, count, loading, error } = useSeminars(
    LIMIT,
    (page - 1) * LIMIT
  );

  const pageCount = Math.ceil(count / LIMIT);

  // Scroll to the top of the page when a new page is selected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return (
      <CircularProgress
        sx={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          m: "0 auto",
        }}
      />
    );
  } else if (error) {
    console.error(error);
    return (
      <Typography color="error">
        Es ist ein Fehler beim Laden der Seminare aufgetreten.
      </Typography>
    );
  } else {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Heading>Aktuelle Seminare und Veranstaltungen</Heading>
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

        {/* Pagination controls */}
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{ mt: 4, mb: 6 }}
        />
      </Box>
    );
  }
};

export default Veranstaltungen;
