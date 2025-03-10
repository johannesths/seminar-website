import { useSeminars } from "../hooks/useSeminars";
import SeminarCard from "../components/SeminarCard";
import { Typography, Box } from "@mui/material";

const Veranstaltungen = () => {
  const { seminars, loading, error } = useSeminars();

  if (loading) {
    return <div>Skeletons are in production</div>;
  } else if (error) {
    return (
      <Typography color="error">
        An error orcurred while loading seminars: {error}
      </Typography>
    );
  } else {
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} p={2}>
        {seminars.map((seminar) => (
          <SeminarCard
            id={seminar.id}
            key={seminar.id}
            title={seminar.title}
            description={seminar.description}
            date={seminar.date}
            time={seminar.time}
            category={seminar.category}
            location={seminar.location}
            url={seminar.url}
          />
        ))}
      </Box>
    );
  }
};

export default Veranstaltungen;
