import { Box, Stack, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import SeperatingLine from "./SeperatingLine";

const CV = () => {
  const events = [
    { date: "1985", description: "Allgemeine Hochschulreife" },
    {
      date: "1988",
      description: "Ausbildung zur Sozialversicherungsfachangestellten",
    },
    {
      date: "1993",
      description:
        "Studium der Sozialpädagogik, Abschluss als Diplom Sozialpädagogin",
    },
    {
      date: "2018",
      description:
        "Rechtliche Betreuerin, Beraterin beim Sozialdienst kath. Frauen e.V.",
    },
    {
      date: "2024",
      description:
        "Selbstständig in den Bereichen Coaching, Supervision und Weiterbildung. Lehrende Transaktionsanalytikerin.",
    },
  ];

  return (
    <Box
      sx={{
        marginX: { xs: "5vw", md: "15vh" },
        marginY: { xs: "3vh", md: "6vh" },
        paddingX: { xs: 2, md: 10 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Mein Werdegang
      </Typography>
      <SeperatingLine />
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: { xs: 0, md: 0.2 },
              textAlign: { xs: "center", md: "right" },
            },
          }}
        >
          {events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="textSecondary">
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  {event.date}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index !== events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  {event.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Stack>
    </Box>
  );
};

export default CV;
